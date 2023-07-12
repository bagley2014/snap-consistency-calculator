import { getCardFromString } from '@lib/getCardFromString'
import { parse, type Expression, type Str, type Sym, type ASTNode } from '@thi.ng/sexpr'
import { Operator, toOperator } from './operators'
import type { CardData } from '@generated/models'
import { getProbabilityOfCardByTurn } from '..'

type State = {
	log: string[]
	deck: CardData[]
	turn: number | null
}

function getDeepValue(node: ASTNode): string {
	switch (node.type) {
		case 'root':
			return node.children.map(getDeepValue).join(' ')
		case 'expr':
			return `(${node.children.map(getDeepValue).join(' ')})`
		case 'sym':
		case 'str':
			return node.value
		case 'num':
			return node.value.toString()
	}
}

function logExpressionResult(node: Expression, result: number, state: State) {
	state.log.push(`The probability of ${getDeepValue(node)} is ${result}`)
}

function parseCard(node: Sym | Str, state: State) {
	const card = getCardFromString(node.value)
	if (card) {
		state.log.push(`Parsed '${node.value}' as ${card.id}`)
		return card
	} else throw new Error(`Unable to determine card for ${node.value}`)
}

function onTurn(node: Expression, state: State) {
	if (state.turn != null) throw new Error("An 'onTurn' expression cannot be the child of another 'onTurn' expression")

	const [_, turnNum, ...operands] = node.children
	if (turnNum.type != 'num') throw new Error("An 'onTurn' expression is missing its turn number")
	if (turnNum.value < 1) throw new Error(`${turnNum.value} is an invalid turn number`)
	if (operands.length < 1) throw new Error("An 'onTurn' expression is missing its operand(s)")
	state.turn = turnNum.value
	let probability = 1
	for (const child of node.children) {
		if (child.type == 'expr') {
			probability *= parseExpression(child, state)
		}
	}
	logExpressionResult(node, probability, state)
	state.turn = null
	return probability
}

function have(node: Expression, state: State) {
	if (!state.turn) throw new Error("A 'have' expression must be the child of an 'onTurn' expression")

	const [_, ...operands] = node.children
	if (operands.length < 1) throw new Error("A 'have' expression is missing its operand(s)")
	let probability = 1
	let deck = state.deck
	let turn = state.turn
	for (const cardNode of operands) {
		if (cardNode.type != 'str' && cardNode.type != 'sym')
			throw new Error(`Expected a card name but got a ${cardNode.type == 'num' ? 'number' : cardNode.type == 'expr' ? 'expression' : 'root'}`)

		const cardData = parseCard(cardNode, state)
		const p = getProbabilityOfCardByTurn(deck, cardData, turn)
		state.log.push(`The probability of having ${cardData.name} on turn ${turn} is ${p}`)

		probability *= p
		deck = deck.filter(x => x.id != cardData.id)
		turn -= 1
	}
	logExpressionResult(node, probability, state)
	return probability
}

function parseExpression(node: Expression, state: State): number {
	if (!node.children.length) {
		state.log.push('Ignoring an empty expression')
		return 1
	}

	// the first child should be an operator; the rest of the children should be operands
	const [operator, ...operands] = node.children

	// we expect the operator to be a string or a symbol; to check that we handle unexpected cases first
	if (operator.type == 'expr') {
		if (!operands.length) {
			state.log.push('Detected an extra pair of parentheses')
			return parseExpression(operator, state)
		} else throw new Error(`Expected an operator but got a expression`)
	} else if (operator.type == 'root') throw new Error(`The parser returned a root node as a child of an expression, which should never happen`)
	else if (operator.type == 'num') throw new Error(`Expected an operator but got a number (${operator.value})`)

	const op = toOperator(operator.value)
	switch (op) {
		case Operator.Have:
			return have(node, state)
		case Operator.OnTurn:
			return onTurn(node, state)
		case Operator.Or:
		case Operator.And:
		default:
			throw new Error('not implemented')
	}
}

export function evaluate(input: string, deck: CardData[]) {
	const root = parse(input)
	const state = { log: [], deck, turn: null }
	let probability = 1
	for (const node of root.children) {
		if (node.type == 'expr') probability *= parseExpression(node, state)
	}
	return { probability, log: state.log }
}
