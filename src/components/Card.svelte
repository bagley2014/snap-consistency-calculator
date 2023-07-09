<script lang="ts">
	import type { CardData } from '@/generated/CardData'
	export let card: CardData

	const imgUrl = () => new URL(`../assets/marvel-snap-cards/${card.imageName}`, import.meta.url).href
</script>

<p>{card.name}</p>
<img src={imgUrl()} alt="{card.name} card image" />
<p>{card.ability}</p>
