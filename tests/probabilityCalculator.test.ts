import { describe, expect, test } from 'vitest'
import { evaluate, getProbabilityOfCardByTurn } from '@lib/probabilityCalculator'

import type { CardData } from '@generated/models'
import allCards from '@assets/marvel-snap-cards/data.json'
import { replace } from 'radash'

const basicDeck = [
	allCards.Angel,
	allCards.Abomination,
	allCards.Angela,
	allCards.Bast,
	allCards.Beast,
	allCards.JeffTheBabyLandShark,
	allCards.Hulk,
	allCards.Lizard,
	allCards.Morph,
	allCards.Valkyrie,
	allCards.Venom,
	allCards.Viper,
] as CardData[]

describe.concurrent('getProbabilityOfCardOnTurn', () => {
	test('card not in deck', () => {
		expect(getProbabilityOfCardByTurn(basicDeck, allCards.SheHulk as CardData, 6)).toBe(0)
	})

	test('invalid turn number', () => {
		expect(() => getProbabilityOfCardByTurn(basicDeck, allCards.Angel as CardData, 0)).toThrowError('turn')
	})

	describe.concurrent('basic', () => {
		test('turn 1', () => {
			expect(getProbabilityOfCardByTurn(basicDeck, allCards.Bast as CardData, 1)).toBe(4 / 12)
		})
		test('turn 2', () => {
			expect(getProbabilityOfCardByTurn(basicDeck, allCards.Lizard as CardData, 2)).toBe(5 / 12)
		})
		test('turn 6', () => {
			expect(getProbabilityOfCardByTurn(basicDeck, allCards.Hulk as CardData, 6)).toBe(9 / 12)
		})
		test('turn 7', () => {
			expect(getProbabilityOfCardByTurn(basicDeck, allCards.Valkyrie as CardData, 7)).toBe(10 / 12)
		})
	})

	describe.concurrent('chavez', () => {
		const deck = replace(basicDeck, allCards.AmericaChavez, x => x == allCards.Morph) as CardData[]

		test('turn 1', () => {
			expect(getProbabilityOfCardByTurn(deck, allCards.Bast as CardData, 1)).toBe(4 / 11)
		})
		test('turn 6', () => {
			expect(getProbabilityOfCardByTurn(deck, allCards.Abomination as CardData, 6)).toBe(8 / 11)
		})
		test('turn 7', () => {
			expect(getProbabilityOfCardByTurn(deck, allCards.Hulk as CardData, 7)).toBe(9 / 11)
		})

		test('turn 1 chavez', () => {
			expect(getProbabilityOfCardByTurn(deck, allCards.AmericaChavez as CardData, 1)).toBe(0)
		})
		test('turn 6 chavez', () => {
			expect(getProbabilityOfCardByTurn(deck, allCards.AmericaChavez as CardData, 6)).toBe(1)
		})
	})

	describe.concurrent('domino', () => {
		const deck = replace(basicDeck, allCards.Domino, x => x == allCards.Morph) as CardData[]

		test('turn 1', () => {
			expect(getProbabilityOfCardByTurn(deck, allCards.Bast as CardData, 1)).toBe(4 / 11)
		})
		test('turn 2', () => {
			expect(getProbabilityOfCardByTurn(deck, allCards.Lizard as CardData, 2)).toBe(4 / 11)
		})
		test('turn 6', () => {
			expect(getProbabilityOfCardByTurn(deck, allCards.Abomination as CardData, 6)).toBe(8 / 11)
		})

		test('turn 1 domino', () => {
			expect(getProbabilityOfCardByTurn(deck, allCards.Domino as CardData, 1)).toBe(0)
		})
		test('turn 2 domino', () => {
			expect(getProbabilityOfCardByTurn(deck, allCards.Domino as CardData, 2)).toBe(1)
		})
		test('turn 3 domino', () => {
			expect(getProbabilityOfCardByTurn(deck, allCards.Domino as CardData, 3)).toBe(1)
		})
	})

	describe.concurrent('quicksilver', () => {
		const deck = replace(basicDeck, allCards.Quicksilver, x => x == allCards.Morph) as CardData[]

		test('turn 1', () => {
			expect(getProbabilityOfCardByTurn(deck, allCards.Bast as CardData, 1)).toBe(3 / 11)
		})
		test('turn 2', () => {
			expect(getProbabilityOfCardByTurn(deck, allCards.Lizard as CardData, 2)).toBe(4 / 11)
		})
		test('turn 6', () => {
			expect(getProbabilityOfCardByTurn(deck, allCards.Abomination as CardData, 6)).toBe(8 / 11)
		})

		test('turn 1 quicksilver', () => {
			expect(getProbabilityOfCardByTurn(deck, allCards.Quicksilver as CardData, 1)).toBe(1)
		})
		test('turn 2 quicksilver', () => {
			expect(getProbabilityOfCardByTurn(deck, allCards.Quicksilver as CardData, 2)).toBe(1)
		})
	})
})

describe.concurrent('evaluate', () => {
	// TODO add a test that checks 'have' with multiple operands
	test('simple', () => {
		const { probability, log } = evaluate('(onTurn 2 (have lizard))', basicDeck)
		expect(log.length).toBeGreaterThan(0)
		expect(probability).toBe(5 / 12)
	})
	test('two cards', () => {
		// or operator not yet implemented
		expect(() => evaluate('(onTurn 1 (or (have bast) (have angel)))', basicDeck)).toThrowError('not implemented')
	})
	test('two turns', () => {
		const { probability, log } = evaluate('(onTurn 1 (have bast)) -> (onTurn 5 (have Val))', basicDeck)
		expect(log.length).toBeGreaterThan(0)
		// I don't think this math is actually right
		expect(probability).toBe((4 / 12) * (8 / 12))
	})
	test('not in deck', () => {
		const { probability, log } = evaluate('(onTurn 4 (have Hela))', basicDeck)
		expect(log.length).toBeGreaterThan(0)
		expect(probability).toBe(0)
	})

	test("have must be nested in 'onTurn'", () => {
		expect(() => evaluate('(have abom)', basicDeck)).toThrowError('onTurn')
	})
})
