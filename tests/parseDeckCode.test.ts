import { expect, test } from 'vitest'

import type { CardData } from '@generated/models'
import allCards from '@assets/marvel-snap-cards/data.json'
import { parseDeckCode } from '@lib/parseDeckCode'

const deckCode =
	'eyJOYW1lIjoiU2h1cmlaZXJvIiwiQ2FyZHMiOlt7IkNhcmREZWZJZCI6Ilplcm8ifSx7IkNhcmREZWZJZCI6IlRpdGFuaWEifSx7IkNhcmREZWZJZCI6IkVib255TWF3In0seyJDYXJkRGVmSWQiOiJBcm1vciJ9LHsiQ2FyZERlZklkIjoiSW52aXNpYmxlV29tYW4ifSx7IkNhcmREZWZJZCI6IkxpemFyZCJ9LHsiQ2FyZERlZklkIjoiU2F1cm9uIn0seyJDYXJkRGVmSWQiOiJTaHVyaSJ9LHsiQ2FyZERlZklkIjoiVHlwaG9pZE1hcnkifSx7IkNhcmREZWZJZCI6IlRhc2ttYXN0ZXIifSx7IkNhcmREZWZJZCI6IlZpc2lvbiJ9LHsiQ2FyZERlZklkIjoiUmVkU2t1bGwifV19'
const expectedDeck = [
	allCards.Zero,
	allCards.Titania,
	allCards.EbonyMaw,
	allCards.Armor,
	allCards.InvisibleWoman,
	allCards.Lizard,
	allCards.Sauron,
	allCards.Shuri,
	allCards.TyphoidMary,
	allCards.Taskmaster,
	allCards.Vision,
	allCards.RedSkull,
] as CardData[]

test('parseDeckCode', () => {
	const actualDeck = parseDeckCode(deckCode)
	expect(actualDeck).toMatchObject(expectedDeck)
})
