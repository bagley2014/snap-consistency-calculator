<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps(['card'])

const imgUrl = computed(() => {
	console.log(new URL(`../assets/marvel-snap-cards/${props.card.imageName}`, import.meta.url))
	console.log(`../assets/marvel-snap-cards/${props.card.imageName}`)
	return new URL(`../assets/marvel-snap-cards/${props.card.imageName}`, import.meta.url).href
})
</script>

<template>
	<img :id="`card-${card.id}`" :src="imgUrl" />
</template>
