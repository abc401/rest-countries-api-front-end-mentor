<script context="module" lang="ts">
	export class DropDownContext {
		constructor(
			public onOptionSelected: (optionData: DropDownOptionData) => void,
			public initialSelection: (optionData: DropDownOptionData) => void,
			readonly selectedOption: Readable<Symbol | undefined>
		) {}
	}
</script>

<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';

	import dropDownContextKey from './dropDownContextKey';
	import type { DropDownOptionData } from './DropDownOption.svelte';
	import { writable, type Readable, type Writable } from 'svelte/store';
	import clsx from 'clsx';

	let className: string = '';
	export { className as class };
	export let name: string | undefined = undefined;

	let state: 'close' | 'open' = 'close';
	function nextState() {
		if (state === 'close') {
			state = 'open';
			document.addEventListener('click', onClickedOutside);
		} else {
			state = 'close';
			document.removeEventListener('click', onClickedOutside);
		}
	}

	let container: HTMLElement | null;
	function onClickedOutside(event: MouseEvent) {
		console.log('On clicked outside.');
		if (container == null || !(event.target instanceof Node)) {
			console.log('Container is Null');
			return;
		}

		if (container.contains(event.target)) {
			console.log('Container contains target.');
			return;
		}

		nextState();
	}

	let selectedOptionContainer: HTMLElement | undefined;
	let { subscribe, set: setSelectedOption }: Writable<Symbol | undefined> = writable(undefined);
	let selectedOption = { subscribe };
	let value: string | undefined = undefined;

	const dispatch = createEventDispatcher();

	function onOptionSelected(optionData: DropDownOptionData) {
		if (optionData.key === $selectedOption) {
			setSelectedOption(undefined);
			value = undefined;
			selectedOptionContainer = undefined;
		} else {
			setSelectedOption(optionData.key);
			value = optionData.value;
			selectedOptionContainer = optionData.container;
		}
		dispatch('select', { value: value });
	}

	function initialSelection(optionData: DropDownOptionData) {
		console.log('Initializing DropDown: ', optionData);
		setSelectedOption(optionData.key);
		value = optionData.value;
		selectedOptionContainer = optionData.container;
	}

	$: {
		console.log('Drop Down Value: ', value);
	}

	let dropDownContext = new DropDownContext(onOptionSelected, initialSelection, selectedOption);
	setContext(dropDownContextKey, dropDownContext);
</script>

<div
	bind:this={container}
	class="relative block rounded-md bg-neutral-100 text-xs font-semibold shadow-md dark:bg-darkblue-700 sm:text-sm"
>
	<input {name} {value} type="hidden" />
	<button
		on:click={function () {
			nextState();
		}}
		type="button"
		class={clsx('w-full', className)}
		aria-expanded={state === 'open'}
	>
		<div class="flex w-full items-center justify-between gap-4 p-4 ps-6">
			{#if $selectedOption == null}
				<slot name="label">
					<span>Select an option</span>
				</slot>
			{:else}
				<div>
					{@html selectedOptionContainer?.innerHTML}
				</div>
			{/if}

			<i
				class="fa-solid fa-chevron-down | transition-transform"
				class:-rotate-180={state === 'open'}
			/>
		</div>
	</button>
	<ul
		class:hidden={state === 'close'}
		class="absolute left-0 right-0 top-full mt-2 flex flex-col justify-items-center rounded-md bg-neutral-100 py-2 shadow-md dark:bg-darkblue-700"
	>
		<slot name="items" />
	</ul>
</div>
