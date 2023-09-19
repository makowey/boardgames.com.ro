export interface Game {
	name: string;
	image: string;
	url: string;
	price: string;
	retailer: {
		name: string;
		logo: string;
		site: string;
		search: string;
		index: string;
	};
}
