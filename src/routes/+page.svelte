<script lang="ts">
	import DropDown from '$lib/DropDown/DropDown.svelte';
	import CountryCard from '$lib/CountryCard.svelte';
	import countries from '$lib/data.json';
	import DropDownOption from '$lib/DropDown/DropDownOption.svelte';
</script>

<main class="px-4 py-5">
	<div class="grid grid-cols-[auto,_1fr] items-center rounded-md bg-neutral-100 px-4">
		<label for="search-box" class="fa-solid fa-magnifying-glass p-4 opacity-30" />
		<input
			id="search-box"
			class="py-3 ps-4 placeholder:text-xs placeholder:opacity-50 focus:outline-none"
			type="text"
			placeholder="Search for a country"
		/>
	</div>
	<div>
		<DropDown>
			<!-- <span slot="label">Hello World</span> -->
			<DropDownOption value="Hello">Element 1</DropDownOption>
			<DropDownOption value="World">Element 2</DropDownOption>
		</DropDown>
		<!-- <select class="p-4">
			<option value="Africa">Africa</option>
			<option value="America">America</option>
			<option value="Asia">Asia</option>
			<option value="Europe">Europe</option>
			<option value="Oceania">Oceania</option>
		</select> -->
	</div>
	<div>
		{#each countries as country, idx (idx)}
			<CountryCard {country} />
		{/each}
	</div>
</main>
