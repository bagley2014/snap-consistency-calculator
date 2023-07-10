import type { CardData } from '@generated/models'

export function isCardInDeck(deck: CardData[], card: CardData) {
	for (const deckItem of deck) {
		if (deckItem.id == card.id) return true
	}
	return false
}
