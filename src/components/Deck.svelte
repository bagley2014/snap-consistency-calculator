<script lang="ts">
	import '@styles/Deck.scss'
	import type { CardData } from '@generated/models'
	import ImageList, { ImageAspectContainer, Item, Label, Supporting, Image } from '@smui/image-list'
	export let cards: CardData[]

	const imgUrl = (card: CardData) => new URL(`../assets/marvel-snap-cards/${card.imageName}`, import.meta.url).href
</script>

<ImageList class="card-image-list">
	{#each cards as card}
		<Item>
			<ImageAspectContainer>
				<Image src={imgUrl(card)} alt="{card.name} card image" />
			</ImageAspectContainer>
			<Supporting>
				<Label class="card-image-list-label">{card.name}</Label>
			</Supporting>
		</Item>
	{/each}
</ImageList>
