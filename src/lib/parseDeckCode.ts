import { Convert, type CardData } from '@generated/models'
import rawData from '@assets/marvel-snap-cards/data.json'

// Takes a marvel snap deck code (a base64 encoded json string) and returns a list of objects for the cards in the deck
// Throws an error on invalid input
export const parseDeckCode = (code: string) => {
	const cardData = rawData as { [id: string]: CardData }

	const deck = Convert.toDeck(atob(code))

	const result = []
	for (const card of deck.Cards) {
		result.push(cardData[card.CardDefId] as CardData)
	}
	return result
}
