import { expect, test } from 'vitest'

import type { CardData } from '@generated/models'
import allCards from '@assets/marvel-snap-cards/data.json'
import { getCardFromString } from '@lib/getCardFromString'

const cases: { [key: string]: CardData | null } = {
	'shuri': allCards.Shuri as CardData,
	'doom': allCards.DrDoom as CardData,
	'ant-man': allCards.AntMan as CardData,
	'Jeff': allCards.JeffTheBabyLandShark as CardData,
	'thor': allCards.Thor as CardData,
	'high evo': allCards.HighEvolutionary as CardData,
	'no matching card': null,
}

for (const testCase in cases) {
	test(testCase, () => {
		const actual = getCardFromString(testCase)
		const expected = cases[testCase]

		if (expected != null) expect(actual).toMatchObject(expected)
		else expect(actual).toBeNull()
	})
}
