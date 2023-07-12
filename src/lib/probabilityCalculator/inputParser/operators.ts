const onTurnStrings = ['onturn']
function isOnTurnOperator(value: string) {
	return onTurnStrings.includes(value)
}

const haveCardStrings = ['has', 'have']
function isHaveCardOperator(value: string) {
	return haveCardStrings.includes(value)
}

const orStrings = ['or', '||', '|']
function isOrOperator(value: string) {
	return orStrings.includes(value)
}

const andStrings = ['and', '&&', '&']
function isAndOperator(value: string) {
	return andStrings.includes(value)
}

export enum Operator {
	OnTurn = 'ON_TURN',
	Have = 'HAVE',
	Or = 'OR',
	And = 'AND',
}

export function toOperator(value: string): Operator | null {
	value = value.toLowerCase()
	if (isOnTurnOperator(value)) return Operator.OnTurn
	if (isHaveCardOperator(value)) return Operator.Have
	if (isOrOperator(value)) return Operator.Or
	if (isAndOperator(value)) return Operator.And
	return null
}
