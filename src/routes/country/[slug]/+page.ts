import { countryStore } from '$lib/stores/country.js';
import type { Country } from '$lib/types/country';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	console.log(`Country load function: ${params.slug}`);

	const country = await countryStore.getCountryByCode(params.slug);

	if (country == null) {
		throw error(404);
	}

	const borders: Country[] = [];
	for (const border of country.borders) {
		const country = await countryStore.getCountryByCode(border);
		if (country != null) {
			borders.push(country);
		}
	}

	return {
		country,
		borders
	};
}
