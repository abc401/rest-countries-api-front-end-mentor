import { Currency, Language, NativeName } from '$lib/types/country';

/*
		The REST countries api represents a few things (in this case, currencies) in the following manner:
			{
				"USD": {
					"name": "United States Dollar",
					"symbol": "$"
				}
				"INR": {
					"name": "Indian Rupee",
					"symbol": "₹"
				}
			}
		
		This format is a bit hard to represent in typescript so I'm changing the structure of those things to a more typescript friendly format as follows:
			[
				{
					shortHand: "USD",
					name: "United States Dollar",
					symbol: "$"
				},
				{
					shortHand: "INR",
					name: "Indian Rupee",
					symbol: "₹"
				}
			]

	*/

export function makeTypeScriptFriendly(country: any) {
	const newCurrencies: Currency[] = [];
	if (country.currencies != null) {
		for (const key of Object.keys(country.currencies)) {
			newCurrencies.push(
				new Currency(key, country.currencies[key].name, country.currencies[key].symbol)
			);
		}
	}
	country.currencies = newCurrencies;

	const newNativeNames: NativeName[] = [];
	if (country.name.nativeName != null) {
		for (const key of Object.keys(country.name.nativeName)) {
			newNativeNames.push(
				new NativeName(
					key,
					country.name.nativeName[key].official,
					country.name.nativeName[key].common
				)
			);
		}
	}
	country.name.nativeName = newNativeNames;

	const newLanguges: Language[] = [];
	if (country.languages != null) {
		for (const key of Object.keys(country.languages)) {
			newLanguges.push(new Language(key, country.languages[key]));
		}
	}
	country.languages = newLanguges;

	if (country.borders == null) {
		country.borders = [];
	}
}
