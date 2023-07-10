<script lang="ts">
	import type { CardData } from '@generated/models'
	import Deck from '@components/Deck.svelte'
	import DeckImporter from '@components/DeckImporter.svelte'

	let cards: CardData[] = []
</script>

<h1>Hello and welcome to my site!</h1>

<DeckImporter bind:importedDeck={cards} />
<Deck {cards} />
