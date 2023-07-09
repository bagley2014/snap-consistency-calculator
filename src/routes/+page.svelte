<script lang="ts">
	import rawCardData from '@assets/marvel-snap-cards/data.json'
	import type { CardData } from '@/generated/CardData'
	import Deck from '@components/Deck.svelte'

	const cardData = rawCardData as { [id: string]: CardData }
	let cards = [
		cardData.NegasonicTeenageWarhead,
		cardData.JeffTheBabyLandShark,
		cardData.TyphoidMary,
		cardData.Angel,
		cardData.Abomination,
		cardData.Angela,
		cardData.Venom,
		cardData.Viper,
		cardData.Vision,
		cardData.Valkyrie,
		cardData.Bast,
		cardData.Beast,
	]
</script>

<h1>Hello and welcome to my site!</h1>
<a href="/about">About my site</a>
<br />
<Deck {cards} />
