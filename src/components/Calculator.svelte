<script lang="ts">
	import Textfield from '@smui/textfield'
	import Paper, { Title, Subtitle, Content } from '@smui/paper'
	import { debounce } from 'radash'
	import type { CardData } from '@generated/models'
	import { evaluate } from '@lib/probabilityCalculator'

	export let deck: CardData[]
	let value = `(onTurn 4 (have shuri))
(onTurn 5 (have skull))
(onTurn 6 (have task))
`
	let subtitle = ''
	let log: string[] = []

	export function reevaluate() {
		console.log('reevaluate called')
		log = []
		try {
			const { probability } = evaluate(value, deck, log)
			subtitle = `Probability: ${probability}`
		} catch (e) {
			subtitle = `Error: ${e instanceof Error ? e.message : 'unknown'}`
		}
	}

	const onInputChanged = debounce({ delay: 100 }, reevaluate)
	reevaluate()
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
