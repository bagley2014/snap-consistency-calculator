<script lang="ts">
	import Textfield from '@smui/textfield'
	import Dialog, { Title, Content, Actions } from '@smui/dialog'
	import Button, { Label } from '@smui/button'
	import { parseDeckCode } from '@lib/parseDeckCode'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	function tryImportDeck(deckCode: string) {
		const lines = deckCode.split('\n').filter(line => line.trim() && line[0] != '#')
		if (lines.length == 0) console.error('All the lines were empty or comments')
		else if (lines.length > 1) console.error("There are multiple lines that aren't empty or comments")
		else {
			try {
				importedDeck = parseDeckCode(lines[0])
				dispatch('imported')
			} catch (error) {
				if (error instanceof DOMException) {
					// atob failed
					console.error('The code failed to parse and is likely invalid')
				}
				if (error instanceof SyntaxError) {
					// parsing as json failed
					console.error('The code failed to parse and is likely invalid')
				}
			}
		}
	}

	function closeHandler(e: CustomEvent<{ action: string }>) {
		if (e.detail.action === 'accept' && value.trim()) tryImportDeck(value)
		value = ''
	}

	export let importedDeck
	export let initialValue
	let open = false
	let value = ''

	if (initialValue) tryImportDeck(initialValue)
</script>

<Button on:click={() => (open = true)} touch variant="unelevated">
	<Label>Load Deck</Label>
</Button>

<Dialog
	bind:open
	selection
	surface$style="width: 850px; max-width: calc(100vw - 32px);"
	aria-labelledby="dialog-title"
	aria-describedby="dialog-content"
	on:SMUIDialog:closed={closeHandler}
>
	<Title id="dialog-title">Paste Deck Code</Title>
	<Content id="dialog-content">
		<div class="margins">
			<Textfield textarea bind:value style="width: 96%; min-height:24em; margin-top:6px;" label="Deck Code" />
		</div>
	</Content>
	<Actions>
		<Button color="secondary" variant="outlined">
			<Label>Cancel</Label>
		</Button>
		<Button variant="unelevated" touch action="accept">
			<Label>Accept</Label>
		</Button>
	</Actions>
</Dialog>

<style>
	div.margins {
		display: flex;
		justify-content: center;
	}
</style>
