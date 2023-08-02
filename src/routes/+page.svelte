<script lang="ts">
	import DropDown from '$lib/DropDown/DropDown.svelte';
	import CountryCard from '$lib/CountryCard.svelte';
	import countries from '$lib/data.json';
	import DropDownOption from '$lib/DropDown/DropDownOption.svelte';
</script>

<main class="flex flex-col gap-8 px-[clamp(1rem,_9vw_-_1.11rem,_7rem)] py-5 sm:gap-12 sm:py-12">
	<div
		class="grid grid-flow-row gap-8 sm:grid-flow-col sm:grid-cols-[minmax(0,_30rem)] sm:justify-between sm:gap-16"
	>
		<label
			for="search-box"
			aria-label="Search Box"
			class="grid grid-cols-[auto,minmax(0,_1fr)] items-center rounded-md bg-neutral-100 px-4 shadow-md"
		>
			<button class="z-10" aria-label="Submit Search">
				<i class="fa-solid fa-magnifying-glass | p-4 opacity-30" />
			</button>
			<input
				id="search-box"
				class="py-3 ps-4 text-xs placeholder:opacity-50 sm:text-sm"
				type="text"
				aria-label="Search Text"
				placeholder="Search for a country"
			/>
		</label>
		<div class="grid grid-cols-[minmax(0,_theme(width.52))]">
			<DropDown class="">
				<span slot="label">Filter by Region</span>
				<svelte:fragment slot="items">
					<DropDownOption value="Africa">Africa</DropDownOption>
					<DropDownOption value="America">America</DropDownOption>
					<DropDownOption value="Asia">Asia</DropDownOption>
					<DropDownOption value="Europe">Europe</DropDownOption>
					<DropDownOption value="Oceania">Oceania</DropDownOption>
				</svelte:fragment>
			</DropDown>
		</div>
	</div>
	<div
		class="grid grid-cols-[repeat(auto-fill,_minmax(16rem,_1fr))] justify-between justify-items-center gap-8 sm:gap-16"
	>
		{#each countries as country, idx (idx)}
			<CountryCard class="w-full max-w-[25rem]" {country} />
		{/each}
	</div>
</main>
<!-- 263 295.5 -->
<!-- grid-cols-[repeat(auto-fill,_minmax(16rem,20rem))] -->
