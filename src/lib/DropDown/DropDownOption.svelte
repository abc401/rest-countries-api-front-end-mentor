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

	const { onOptionSelected, initialSelection, selectedOption }: DropDownContext =
		getContext(dropDownContextKey);

	let optionKey = Symbol();
	let container: HTMLElement;
	export let value: string | undefined = undefined;
	export let selected: boolean = false;

	let optionData: DropDownOptionData;
	onMount(function () {
		optionData = new DropDownOptionData(optionKey, value, container);
		if (selected) {
			initialSelection(optionData);
		}
	});

	$: isSelected = $selectedOption === optionKey;
</script>

<li
	class={clsx('flex items-center dark:bg-darkblue-700', {
		'bg-darkblue-700 text-neutral-100 dark:bg-neutral-100 dark:text-darkblue-900': isSelected
	})}
>
	<button
		class="w-full p-2 ps-6"
		bind:this={container}
		on:click={function () {
			console.log('Option Clicked: ', value);
			onOptionSelected(optionData);
		}}
	>
		<div class="w-fit">
			<slot />
		</div>
	</button>
</li>
