<script lang="ts">
	import Card from '@components/Card.svelte'
	import rawCardData from '@assets/marvel-snap-cards/data.json'
	import type { CardData } from '@/generated/CardData'

	const cardData = rawCardData as { [id: string]: CardData }
	let card = cardData.Angel
</script>

<h1>Hello and welcome to my site!</h1>
<a href="/about">About my site</a>
<br />
<Card {card} />
