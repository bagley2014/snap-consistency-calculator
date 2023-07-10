<script lang="ts">
	import type { CardData } from '@generated/models'
	import Deck from '@components/Deck.svelte'
	import DeckImporter from '@components/DeckImporter.svelte'
	import Calculator from '@components/Calculator.svelte'

	let cards: CardData[] = []
</script>

<h3>Hello and welcome to my site!</h3>

<DeckImporter bind:importedDeck={cards} />
<Deck {cards} />
<Calculator deck={cards} />
