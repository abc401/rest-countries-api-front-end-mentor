import { QUERY_PARAM_NAME } from '$lib/consts/api';
import type { Country } from '$lib/types/country';
import { makeTypeScriptFriendly } from '$lib/utils/api';
import { json } from '@sveltejs/kit';

export async function GET(request) {
	const searchParams = request.url.searchParams;

	const query = searchParams.get(QUERY_PARAM_NAME) || '';

	const response = await fetch(
		query === ''
			? `https://restcountries.com/v3.1/all`
			: `https://restcountries.com/v3.1/name/${query}`
	);

	let results;
	if (response.ok) {
		results = await response.json();
	} else if (response.status === 404) {
		results = [];
	} else {
		return response;
	}

	for (const country of results) {
		makeTypeScriptFriendly(country);
	}

	results = results as Country[];

	return json(results);
}
