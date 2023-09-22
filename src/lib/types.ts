export interface Game {
	name: string;
	image: string;
	url: string;
	price: string;
	yearpublished: number;
	minplayers: number;
	maxplayers: number;
	playingtime: number;
	description: string;
	retailer: {
		name: string;
		logo: string;
		site: string;
		search: string;
		index: string;
	};
}
