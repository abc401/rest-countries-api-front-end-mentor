<script context="module" lang="ts">
	export class DropDownOptionData {
		constructor(
			readonly key: Symbol,
			readonly value: string | undefined,
			readonly container: HTMLElement
		) {}
	}
</script>

<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import dropDownContextKey from './dropDownContextKey';
	import type { DropDownContext } from './DropDown.svelte';
	import clsx from 'clsx';

	const { onOptionSelected, selectedOption }: DropDownContext = getContext(dropDownContextKey);

	let optionKey = Symbol();
	let container: HTMLElement;
	export let value: string | undefined = undefined;

	let optionData: DropDownOptionData;
	onMount(function () {
		optionData = new DropDownOptionData(optionKey, value, container);
	});

	$: isSelected = $selectedOption === optionKey;
</script>

<li class={clsx({ 'bg-black text-white': isSelected })}>
	<button
		bind:this={container}
		on:click={function () {
			onOptionSelected(optionData);
		}}
	>
		<div>
			<slot />
		</div>
	</button>
</li>
