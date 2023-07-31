<script lang="ts">
	export let country: any;
</script>

<div>
	<img src={country.flag} alt="" />
	{country.name}
	<div>
		<div>Population: {country.population}</div>
		<div>Region: {country.region}</div>
		<div>Capital: {country.capital}</div>
	</div>
</div>
