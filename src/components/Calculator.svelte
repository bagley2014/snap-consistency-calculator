<script lang="ts">
	import Textfield from '@smui/textfield'
	import Paper, { Title, Subtitle, Content } from '@smui/paper'
	import { debounce } from 'radash'
	import type { CardData } from '@generated/models'

	export let deck: CardData[]
	let value = ''
	let subtitle = 'Default Subtitle'
	let content = 'Default content'

	const onInputChanged = debounce({ delay: 100 }, _event => {
		content = deck.toString()
		subtitle = value
	})
</script>

<Textfield textarea bind:value on:input={onInputChanged} style="width: 96%; min-height:24em; margin-top:6px;" label="Calculator Script" />

<Paper variant="unelevated">
	<Title>Calculator Results</Title>
	<Subtitle>{subtitle}</Subtitle>
	<Content>{content}</Content>
</Paper>
