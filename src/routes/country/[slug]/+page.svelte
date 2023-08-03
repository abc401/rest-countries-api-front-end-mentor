<script>
	export let data;
	$: country = data.country;
	$: borders = data.borders;
</script>

<main class="p-7">
	<button class="rounded-sm bg-neutral-100 px-6 py-1.5 shadow-md">
		<i class="fa-solid fa-arrow-left" />Back
	</button>
	<img src={country.flags.svg} alt="" class="mb-12 mt-14" />
	<div>
		<h2 class="my-6 text-xl font-extrabold">{country.name}</h2>
		<div class="flex flex-col gap-9">
			<ul class="flex flex-col gap-3">
				<li><span class="font-semibold">Native Name:</span> {country.nativeName}</li>
				<li><span class="font-semibold">Population:</span> {country.population}</li>
				<li><span class="font-semibold">Region:</span> {country.region}</li>
				<li><span class="font-semibold">Sub Region:</span> {country.subregion}</li>
				<li><span class="font-semibold">Capital</span> {country.capital}</li>
			</ul>
			<ul class="flex flex-col gap-3">
				<li><span class="font-semibold">Top Level Domain:</span> {country.topLevelDomain}</li>
				<li>
					<span class="font-semibold">Currencies: </span>
					{country.currencies?.map((currency) => currency.name).toString()}
				</li>
				<li>
					<span class="font-semibold">Languages: </span>
					{country.languages.map((language) => language.name).toString()}
				</li>
			</ul>

			<div>
				<h3 class="text-base font-semibold">Border Countries:</h3>
				<ul class="my-4 flex flex-wrap gap-2 text-xs">
					{#each borders as border}
						<a
							data-sveltekit-preload-data="off"
							class=" rounded-sm bg-neutral-100 px-6 py-1.5 shadow-md"
							href={`/country/${border.alpha3Code}`}>{border.name}</a
						>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</main>
