<script>
	export let data;
	$: country = data.country;
	$: borders = data.borders;
</script>

<main
	class="space-y-[clamp(4rem,_3vw_+_1.6rem,_5rem)] p-[clamp(1.75rem,_12vw_-_6rem,_5rem)] sm:text-base"
>
	<button
		class="w-fit rounded-sm bg-neutral-100 px-6 py-1.5 shadow-md dark:bg-darkblue-700 sm:rounded-lg sm:px-10 sm:py-2"
		on:click={() => history.back()}
	>
		<i class="fa-solid fa-arrow-left" />Back
	</button>
	<div
		class="grid gap-[clamp(2.5rem,_20vw_-_10.6rem,_8rem)] sm:grid-cols-[minmax(20rem,_1fr),_auto]"
	>
		<img src={country.flags.svg} alt="" class="w-full" />
		<div class="grid min-w-[15rem] max-w-md grid-rows-[repeat(2,_auto),_1fr,_auto] gap-6">
			<h2 class=" text-xl font-extrabold sm:text-4xl">{country.name.common}</h2>
			<div class="flex flex-wrap justify-between gap-6">
				<ul class=" space-y-2">
					<li class="">
						<span class="font-semibold">Native Name:</span>
						<span>
							{#each country.name.nativeName as nativeName}
								{nativeName.official}{', '}
							{/each}
							{country.name.nativeName[0].official}
						</span>
					</li>
					<li class="">
						<span class="font-semibold">Population:</span>
						{country.population}
					</li>
					<li class=""><span class="font-semibold">Region:</span> {country.region}</li>
					<li class="">
						<span class="font-semibold">Sub Region:</span>
						{country.subregion}
					</li>
					<li class=""><span class="font-semibold">Capital</span> {country.capital}</li>
				</ul>

				<ul class="space-y-2">
					<li class="">
						<span class="font-semibold">Top Level Domain:</span>
						{country.tld}
					</li>
					<li class="">
						<span class="font-semibold">Currencies: </span>
						{country.currencies?.map((currency) => currency.name).toString()}
					</li>
					<li class="">
						<span class="font-semibold">Languages: </span>
						{country.languages.map((language) => language.name).toString()}
					</li>
				</ul>
			</div>

			{#if borders.length !== 0}
				<div class="row-end-[-1] grid gap-2 sm:grid-rows-[auto,auto]">
					<h3 class="text-base font-semibold">Border Countries:</h3>
					<ul class="flex flex-wrap gap-2 text-xs sm:text-sm">
						{#each borders as border}
							<a
								data-sveltekit-preload-data="off"
								class=" rounded-sm bg-neutral-100 px-6 py-1.5 shadow-md dark:bg-darkblue-700"
								href={`/country/${border.cca3}`}>{border.name.official}</a
							>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</div>
</main>
