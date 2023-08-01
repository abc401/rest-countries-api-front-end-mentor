<script lang="ts">
	import clsx from 'clsx';

	export let country: any;
	let className: string = '';
	export { className as class };
</script>

<a href="#" class={clsx('block overflow-hidden rounded-md bg-neutral-100 shadow-md', className)}>
	<div class="grid h-full grid-rows-2 overflow-hidden rounded-md">
		<img src={country.flags.png} class="aspect-[2/1] h-full object-cover" alt="" />
		<div class="flex h-fit flex-col gap-4 p-7">
			<h2 class="">{country.name}</h2>
			<div class="leading-6">
				<div><span class="font-semibold">Population:</span> {country.population}</div>
				<div><span class="font-semibold">Region:</span> {country.region}</div>
				<div><span class="font-semibold">Capital:</span> {country.capital}</div>
			</div>
		</div>
	</div>
</a>
