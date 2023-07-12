<script lang="ts">
	import Textfield from '@smui/textfield'
	import Paper, { Title, Subtitle, Content } from '@smui/paper'
	import { debounce } from 'radash'
	import type { CardData } from '@generated/models'
	import { evaluate } from '@lib/probabilityCalculator'

	export let deck: CardData[]
	let value = ''
	let subtitle = '-'
	let log: string[] = []

	// TODO somehow this component needs to update after a deck is imported
	const onInputChanged = debounce({ delay: 100 }, _event => {
		log = []
		try {
			const { probability } = evaluate(value, deck, log)
			subtitle = `Probability: ${probability}`
		} catch (e) {
			subtitle = `Error: ${e instanceof Error ? e.message : 'unknown'}`
		}
	})
</script>

<Textfield textarea bind:value on:input={onInputChanged} style="width: 96%; min-height:24em; margin-top:6px;" label="Calculator Script" />

<Paper variant="unelevated">
	<Title>Calculator Results</Title>
	<Subtitle>{subtitle}</Subtitle>
	<Content>
		{#each log as entry}
			{entry}<br />
		{/each}
	</Content>
</Paper>
