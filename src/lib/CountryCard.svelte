<script lang="ts">
	import clsx from 'clsx';

	export let country: any;
	let className: string = '';
	export { className as class };
</script>

<a
	href={`/country/${country.alpha3Code}`}
	class={clsx('block overflow-hidden rounded-md bg-neutral-100 shadow-md', className)}
>
	<div class="grid h-full grid-rows-[auto,_auto] overflow-hidden rounded-md">
		<img src={country.flags.svg} class="aspect-[2/1] w-full object-cover" alt="" />
		<div class="flex h-fit flex-col gap-4 p-7">
			<h2 class="text-base font-extrabold">{country.name}</h2>
			<div class="leading-6">
				<div><span class="font-semibold">Population:</span> {country.population}</div>
				<div><span class="font-semibold">Region:</span> {country.region}</div>
				<div><span class="font-semibold">Capital:</span> {country.capital}</div>
			</div>
		</div>
	</div>
</a>
