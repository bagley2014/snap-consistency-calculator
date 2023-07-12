<script lang="ts">
	import type { CardData } from '@generated/models'
	import Deck from '@components/Deck.svelte'
	import DeckImporter from '@components/DeckImporter.svelte'
	import Calculator from '@components/Calculator.svelte'

	let cards: CardData[] = []
	let calculatorComponent: Calculator

	const onDeckImport = () => calculatorComponent.reevaluate()
</script>

<h3>Hello and welcome to my site!</h3>

<DeckImporter
	on:imported={onDeckImport}
	bind:importedDeck={cards}
	initialValue="eyJOYW1lIjoiU2F1cm9uIiwiQ2FyZHMiOlt7IkNhcmREZWZJZCI6IktpdHR5UHJ5ZGUifSx7IkNhcmREZWZJZCI6Ilplcm8ifSx7IkNhcmREZWZJZCI6IkVib255TWF3In0seyJDYXJkRGVmSWQiOiJBcm1vciJ9LHsiQ2FyZERlZklkIjoiTGl6YXJkIn0seyJDYXJkRGVmSWQiOiJTYXVyb24ifSx7IkNhcmREZWZJZCI6IlNodXJpIn0seyJDYXJkRGVmSWQiOiJFbmNoYW50cmVzcyJ9LHsiQ2FyZERlZklkIjoiVHlwaG9pZE1hcnkifSx7IkNhcmREZWZJZCI6IlRhc2ttYXN0ZXIifSx7IkNhcmREZWZJZCI6IlJlZFNrdWxsIn0seyJDYXJkRGVmSWQiOiJTaGVIdWxrIn1dfQ=="
/>
<Deck {cards} />
<Calculator bind:this={calculatorComponent} deck={cards} />
