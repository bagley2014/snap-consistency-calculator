import * as _ from 'radash'

import type { CardData } from '@generated/models'
import allCards from '@assets/marvel-snap-cards/data.json'

export function getCardFromString(str: string) {
	const matchingCards = _.select(
		_.listify(allCards, x => allCards[x]),
		x => x,
		// a card matches if the input is a substring of either its id or its name, case insensitive
		x => x.id.toLowerCase().includes(str.toLowerCase()) || x.name.toLowerCase().includes(str.toLowerCase()),
	)

	if (matchingCards.length == 0) return null

	// we use the shortest matching title as a heuristic for the most accurate
	return _.sort(matchingCards, x => x.name.length, false)[0] as CardData
}
