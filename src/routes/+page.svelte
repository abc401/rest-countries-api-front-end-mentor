<script lang="ts">
	import DropDown from '$lib/DropDown/DropDown.svelte';
	import { countryStore } from '$lib/stores/country';
	import DropDownOption from '$lib/DropDown/DropDownOption.svelte';
	import { goto } from '$app/navigation';
	import { afterUpdate } from 'svelte';
	import {
		PAGE_NUMBER_PARAM_NAME,
		QUERY_PARAM_NAME,
		REGIONS,
		REGION_PARAM_NAME
	} from '$lib/consts/api';
	import PageNavigation from '$lib/PageNavigation.svelte';

	let initialLoad = true;
	function isInitialLoad() {
		return initialLoad;
	}

	let queryInputValue = countryStore.query;
	$: {
		if (!isInitialLoad()) {
			updateURLParam(QUERY_PARAM_NAME, queryInputValue);
		}
	}

	let regionValue = countryStore.region;
	$: {
		if (!isInitialLoad()) {
			updateURLParam(REGION_PARAM_NAME, regionValue);
		}
	}

	$: pageNumber = $countryStore.currentPageNumber;

	function updateURLParam(name: string, value: string | undefined) {
		let urlParams = new URL(window.location.href).searchParams;
		if (value == null || value === '') {
			urlParams.delete(name);
		} else {
			urlParams.set(name, value);
		}
		goto(`?${urlParams.toString()}`);
	}

	afterUpdate(function () {
		initialLoad = false;
	});

	let queryInput: HTMLInputElement | undefined;

	const nPageNavLinks = 4;
</script>

<main class="flex flex-col gap-8 px-[clamp(1rem,_9vw_-_1.11rem,_7rem)] py-5 sm:gap-12 sm:py-12">
	<form
		method="get"
		class="grid grid-flow-row gap-8 sm:grid-flow-col sm:grid-cols-[minmax(0,_30rem)] sm:justify-between sm:gap-16"
	>
		<label
			for="search-box"
			aria-label="Search Box"
			class="grid grid-cols-[auto,minmax(0,_1fr)] items-center rounded-md bg-neutral-100 px-4 shadow-md dark:bg-darkblue-700"
		>
			<button class="z-10" aria-label="Submit Search">
				<i class="fa-solid fa-magnifying-glass | p-4 opacity-30 dark:opacity-100" />
			</button>
			<input
				id="search-box"
				class="bg-transparent py-3 ps-4 text-xs placeholder:opacity-50 dark:placeholder:text-neutral-100 dark:placeholder:opacity-100 sm:text-sm"
				type="text"
				bind:this={queryInput}
				on:change={function () {
					if (queryInput == null) return;
					queryInputValue = queryInput.value;
				}}
				value={queryInputValue == null ? '' : queryInputValue}
				aria-label="Search Text"
				placeholder="Search for a country"
			/>
			<input
				type="hidden"
				name={!!queryInputValue ? QUERY_PARAM_NAME : undefined}
				value={queryInputValue}
			/>
		</label>
		<div class="grid grid-cols-[minmax(0,_theme(width.52))]">
			<DropDown
				on:select={async function (event) {
					regionValue = event.detail.value;
				}}
			>
				<span slot="label">Filter by Region</span>
				<svelte:fragment slot="items">
					{#each REGIONS as region}
						<DropDownOption
							selected={region.toLowerCase() === regionValue?.toLowerCase()}
							value={region.toLowerCase()}
						>
							{region[0].toUpperCase() + region.slice(1)}
						</DropDownOption>
					{/each}
				</svelte:fragment>
			</DropDown>
			<input
				type="hidden"
				name={!!regionValue ? REGION_PARAM_NAME : undefined}
				bind:value={regionValue}
			/>
		</div>
	</form>
	<div class="flex place-content-center">
		<PageNavigation
			class="bg-neutral-100"
			maxPageLinks={nPageNavLinks}
			currentPage={pageNumber}
			maxPage={$countryStore.totalPages}
			on:navigate={function (event) {
				updateURLParam(PAGE_NUMBER_PARAM_NAME, event.detail.pageNumber.toString());
			}}
		/>
	</div>
	<div
		class="grid grid-cols-[repeat(auto-fill,_minmax(16rem,_1fr))] justify-between justify-items-start gap-8 sm:gap-16"
	>
		{#each $countryStore.pageEntries as country (country.cca3)}
			<a
				href={`/country/${country.cca3}`}
				data-sveltekit-preload-data="off"
				class="block w-full overflow-hidden rounded-md bg-neutral-100 shadow-md dark:bg-darkblue-700"
			>
				<div class="grid h-full grid-rows-[auto,_auto] overflow-hidden rounded-md">
					<img src={country.flags.svg} class="aspect-[2/1] w-full object-cover" alt="" />
					<div class="flex h-fit flex-col gap-4 p-7">
						<h2 class="text-base font-extrabold">{country.name.official}</h2>
						<div class="leading-6">
							<div><span class="font-semibold">Population:</span> {country.population}</div>
							<div><span class="font-semibold">Region:</span> {country.region}</div>
							<div><span class="font-semibold">Capital:</span> {country.capital}</div>
						</div>
					</div>
				</div>
			</a>
		{/each}
	</div>

	<div class="flex place-content-center">
		<PageNavigation
			class="bg-neutral-100"
			maxPageLinks={nPageNavLinks}
			currentPage={pageNumber}
			maxPage={$countryStore.totalPages}
			on:navigate={function (event) {
				updateURLParam(PAGE_NUMBER_PARAM_NAME, event.detail.pageNumber.toString());
			}}
		/>
	</div>
</main>
