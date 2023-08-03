import data from '$lib/data.json';

export function load({ params }) {
	console.log(`Country load function: ${params.slug}`);
	const slug = params.slug;
	const filtered = data.filter((value) => {
		return value.alpha3Code.toLowerCase() === slug.toLowerCase();
	});
	const country = filtered[0];
	const borders = data.filter((value) => {
		return country.borders?.includes(value.alpha3Code);
	});
	console.log(country, borders);
	return {
		country: country,
		borders: borders
	};
}
