import type { CardData } from '@generated/models'
import allCards from '@assets/marvel-snap-cards/data.json'
import { isCardInDeck } from './utility'

export function getProbabilityOfCardByTurn(deck: CardData[], card: CardData, turn: number) {
	if (turn < 1) throw new RangeError(`turn should be at least 1 but was ${turn}`)

	// cards not in deck can't be drawn
	if (!isCardInDeck(deck, card)) return 0

	// by default, a player draws 3 cards to start plus 1 per turn
	let cardsDrawn = 3 + turn
	// by default, a deck has 12 cards available to be drawn
	let cardsAvailable = 12

	// some cards are drawn on specific turns (barring special circumstances)
	if (card.id == allCards.Quicksilver.id) {
		return 1
	}
	if (card.id == allCards.Domino.id) {
		if (turn >= 2) return 1
		else return 0
	}
	if (card.id == allCards.AmericaChavez.id) {
		if (turn >= 6) return 1
		else return 0
	}

	// cards drawn on specific turns reduce the number of cards available to be drawn on other turns,
	// but also reduce the number of other cards drawn from that turn onwards
	if (isCardInDeck(deck, allCards.Quicksilver as CardData)) {
		cardsAvailable -= 1
		cardsDrawn -= 1
	}
	if (isCardInDeck(deck, allCards.Domino as CardData)) {
		cardsAvailable -= 1
		if (turn >= 2) cardsDrawn -= 1
	}
	if (isCardInDeck(deck, allCards.AmericaChavez as CardData)) {
		cardsAvailable -= 1
		if (turn >= 6) cardsDrawn -= 1
	}

	return cardsDrawn / cardsAvailable
}
