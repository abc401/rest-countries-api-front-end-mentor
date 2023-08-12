import { countryStore } from '$lib/stores/country.js';
import { PAGE_NUMBER_PARAM_NAME, QUERY_PARAM_NAME, REGION_PARAM_NAME } from '$lib/consts/api';

export async function load({ url }) {
	const query = url.searchParams.get(QUERY_PARAM_NAME) || undefined;
	const region = url.searchParams.get(REGION_PARAM_NAME) || undefined;
	const pageNumber = parseInt(url.searchParams.get(PAGE_NUMBER_PARAM_NAME) || '1');

	await countryStore.change(query, region, pageNumber);
}
