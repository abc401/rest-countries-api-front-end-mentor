<script lang="ts">
	import DropDown from '$lib/DropDown/DropDown.svelte';
	import CountryCard from '$lib/CountryCard.svelte';
	import countries from '$lib/data.json';
	import DropDownOption from '$lib/DropDown/DropDownOption.svelte';
</script>

<main class="flex flex-col gap-8 px-4 py-5">
	<div class="grid gap-8">
		<label
			for="search-box"
			aria-label="Search Box"
			class="grid grid-cols-[auto,minmax(0,_1fr)] items-center rounded-md bg-neutral-100 px-4 shadow-md sm:max-w-[30rem]"
		>
			<button class="z-10" aria-label="Submit Search">
				<i class="fa-solid fa-magnifying-glass | p-4 opacity-30" />
			</button>
			<input
				id="search-box"
				class="py-3 ps-4 placeholder:text-xs placeholder:opacity-50"
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
	<div class="grid grid-cols-[repeat(auto-fit,_minmax(14rem,_16.63rem))] justify-center gap-y-8">
		{#each countries as country, idx (idx)}
			<CountryCard class="" {country} />
		{/each}
	</div>
</main>
<!-- 263 295.5 -->
