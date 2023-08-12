import { error } from '@sveltejs/kit';
import type { Country } from '$lib/types/country';
import {
	writable,
	type Writable,
	type Readable,
	type Invalidator,
	type Subscriber,
	type Unsubscriber,
	type Updater
} from 'svelte/store';
import { PAGE_SIZE, QUERY_PARAM_NAME } from '$lib/consts/api';
import { makeTypeScriptFriendly } from '$lib/utils/api';

interface StoreData {
	pageEntries: Country[];
	totalPages: number;
	currentPageNumber: number;
}

class CountryStore implements Readable<StoreData> {
	subscribe: (
		run: Subscriber<StoreData>,
		invalidate?: Invalidator<StoreData> | undefined
	) => Unsubscriber;
	private set: (value: StoreData) => void;
	private update: (updater: Updater<StoreData>) => void;

	private _query: string | undefined = undefined;
	private _pageNumber = 0;
	private _region: string | undefined = undefined;

	rawResults: Country[] = [];
	filteredResults: Country[] = [];

	private initialized = false;
	private urlDomainName = '';

	constructor() {
		const { subscribe, set, update }: Writable<StoreData> = writable({
			pageEntries: Array<Country>(),
			totalPages: 1,
			currentPageNumber: 1
		});
		this.subscribe = subscribe;
		this.set = set;
		this.update = update;
	}

	async change(query: string | undefined, region: string | undefined, pageNumber = 1) {
		await this.setQuery(query);
		this.region = region;
		this.pageNumber = pageNumber;
		console.log('Store updated');
	}

	set urlOrigin(origin: string) {
		this.urlDomainName = origin;
	}

	async setQuery(v: string | undefined) {
		if (this._query === v && this.initialized) {
			return;
		}

		this._query = v;
		await this.updateRawResults();
	}

	get query() {
		return this._query;
	}

	private async updateRawResults() {
		const apiURL = new URL(`${this.urlDomainName}/`);

		if (this._query != null) {
			apiURL.searchParams.set(QUERY_PARAM_NAME, this._query);
		}

		const res = await fetch(apiURL);
		if (res.ok) {
			const countries = await res.json();
			this.rawResults = countries;
			this.filterResults();
			return;
		}
		throw error(res.status, res.statusText);
	}

	private pageStartIndex() {
		return this._pageNumber * PAGE_SIZE;
	}

	private pageEndIndex() {
		return Math.min(this.pageStartIndex() + PAGE_SIZE, this.rawResults.length);
	}

	totalPages() {
		return Math.max(Math.ceil(this.filteredResults.length / PAGE_SIZE), 1);
	}

	async getCountryByCode(cca3: string) {
		for (const country of this.rawResults) {
			if (country.cca3 === cca3) {
				return JSON.parse(JSON.stringify(country)) as Country;
			}
		}

		const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${cca3}`);
		let country: Country;
		if (response.ok) {
			country = (await response.json())[0];
			makeTypeScriptFriendly(country);

			return country;
		}
	}

	set pageNumber(v: number) {
		if (this.pageNumber === v && this.initialized) {
			return;
		}

		this._pageNumber = Math.max(Math.min(v - 1, this.totalPages() - 1), 0);
		this.updateStore();
	}

	get pageNumber() {
		return this._pageNumber + 1;
	}

	private updateStore() {
		this.set({
			pageEntries: this.filteredResults.slice(this.pageStartIndex(), this.pageEndIndex()),
			currentPageNumber: this.pageNumber,
			totalPages: this.totalPages()
		});
		this.initialized = true;
	}

	private filterResults() {
		if (this._region == null) {
			this.filteredResults = this.rawResults.slice();
		} else {
			this.filteredResults = this.rawResults.filter((value) => {
				if (this._region == null) {
					return true;
				}
				return value.region.toLowerCase().includes(this._region);
			});
		}
		this.updateStore();
	}

	set region(v: string | undefined) {
		if (this._region === v && this.initialized) {
			return;
		}
		this._region = v;
		this._pageNumber = 0;
		this.filterResults();
	}

	get region() {
		return this._region;
	}
}

const countryStore = new CountryStore();

export { countryStore };
