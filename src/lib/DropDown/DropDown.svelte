<script context="module" lang="ts">
	export class DropDownContext {
		constructor(
			public onOptionSelected: (optionData: DropDownOptionData) => void,
			readonly selectedOption: Readable<Symbol | undefined>
		) {}
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import clsx from 'clsx';

	import dropDownContextKey from './dropDownContextKey';
	import type { DropDownOptionData } from './DropDownOption.svelte';
	import { writable, type Readable, type Writable } from 'svelte/store';

	let expanded = false;

	let selectedOptionContainer: HTMLElement;
	let { subscribe, set: setSelectedOption }: Writable<Symbol | undefined> = writable(undefined);
	let selectedOption = { subscribe };
	let value: string | undefined = undefined;

	function onOptionSelected(optionData: DropDownOptionData) {
		setSelectedOption(optionData.key);
		value = optionData.value;
		selectedOptionContainer = optionData.container;
		dropDownContext = dropDownContext;
	}

	let dropDownContext = new DropDownContext(onOptionSelected, selectedOption);
	setContext(dropDownContextKey, dropDownContext);
</script>

<div class="relative">
	<button
		on:click={function () {
			expanded = !expanded;
		}}
		aria-expanded={expanded}
	>
		{#if $selectedOption == null}
			<slot name="label">
				<span>Select an option</span>
			</slot>
		{:else}
			{@html selectedOptionContainer.innerHTML}
		{/if}
	</button>
	<ul
		class={clsx('absolute left-0 right-0 top-full opacity-0', {
			'opacity-100': expanded
		})}
	>
		<slot />
	</ul>
</div>
