import { json } from '@sveltejs/kit';
import { findRetailerByIndex } from '../../../component/retailers';
import type { Game } from '$lib/types';

export async function GET({ url, fetch }) {
	const search = url.searchParams.get('search');
	console.log(`Search for [${search}]`);
	if (search && search.length < 3) {
		return new Response(JSON.stringify({}), {
			status: 403,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	let data: any[] = [];

	const PION: any = findRetailerByIndex('PION');
	let response = await fetch(PION.search + search);
	let dataPion = await response.json();
	dataPion = [
		...dataPion.results.map((game: Game) => {
			return {
				...game,
				image: game.image.replace('50x50', '500x500'),
				retailer: PION
			};
		})
	];
	data = [...data, ...dataPion];

	const LEXSHOP: any = findRetailerByIndex('LEXSHOP');
	response = await fetch(LEXSHOP.search + search);
	let dataLexshop = await response.json();
	dataLexshop = [...dataLexshop.suggestions].map((game) => {
		return {
			name: game.value,
			image: game.cover?.split('src="')[1]?.split('&crop=')[0].replace('45-45', '500-500'),
			url: LEXSHOP.site + game.link,
			price: game.pret,
			retailer: LEXSHOP
		};
	});
	data = [...data, ...dataLexshop];

	const OZONE: any = findRetailerByIndex('OZONE');
	response = await fetch(OZONE.search + search);
	let dataOzone = await response.json();
	dataOzone = [...dataOzone.items].map((game) => {
		return { name: game.l, image: game.t2, url: game.u, price: game.p, retailer: OZONE };
	});
	data = [...data, ...dataOzone];

	return json({
		status: 'success',
		games: data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
	});
}
