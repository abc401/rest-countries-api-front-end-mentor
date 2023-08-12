export class Currency {
	constructor(readonly shortHand: string, readonly name: string, readonly symbol: string) {}
}

export class NativeName {
	constructor(readonly lang: string, readonly official: string, readonly common: string) {}
}

export class Language {
	constructor(readonly shortHand: string, readonly name: string) {}
}

export interface Country {
	name: {
		common: string;
		official: string;
		nativeName: NativeName[];
	};
	population: number;
	region: string;
	subregion: string;
	capital: string[];
	tld: string[];
	cca3: string;
	currencies: Currency[];
	languages: Language[];

	flags: {
		svg: string;
		alt: string;
	};
	borders: string[];
}
