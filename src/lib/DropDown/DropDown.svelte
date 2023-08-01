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

	import dropDownContextKey from './dropDownContextKey';
	import type { DropDownOptionData } from './DropDownOption.svelte';
	import { writable, type Readable, type Writable } from 'svelte/store';
	import clsx from 'clsx';

	let className: string = '';
	export { className as class };

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
		if (container == null || !(event.target instanceof Node)) {
			return;
		}

		if (container.contains(event.target)) {
			return;
		}

		nextState();
	}

	let selectedOptionContainer: HTMLElement | undefined;
	let { subscribe, set: setSelectedOption }: Writable<Symbol | undefined> = writable(undefined);
	let selectedOption = { subscribe };
	let value: string | undefined = undefined;

	function onOptionSelected(optionData: DropDownOptionData) {
		if (optionData.key === $selectedOption) {
			setSelectedOption(undefined);
			value = undefined;
			selectedOptionContainer = undefined;
			return;
		}
		setSelectedOption(optionData.key);
		value = optionData.value;
		selectedOptionContainer = optionData.container;
	}

	let dropDownContext = new DropDownContext(onOptionSelected, selectedOption);
	setContext(dropDownContextKey, dropDownContext);
</script>

<div
	bind:this={container}
	class="relative block rounded-md bg-neutral-100 text-xs font-semibold shadow-md"
>
	<button
		on:click={function () {
			nextState();
		}}
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
		class="absolute left-0 right-0 top-full mt-2 flex flex-col justify-items-center rounded-md bg-neutral-100 py-2 shadow-md"
	>
		<slot name="items" />
	</ul>
</div>
