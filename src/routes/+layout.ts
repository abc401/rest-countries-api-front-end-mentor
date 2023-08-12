import { countryStore } from '$lib/stores/country';

export function load({ url }) {
	countryStore.urlOrigin = url.origin;
}
