// https://api.geekdo.com/api/trends/ownership?interval=week

import { json } from '@sveltejs/kit';
import type { Kickstarter } from '$lib/types';

export async function GET({ fetch }) {
	console.log(`Search for [most played list] on BGG`);
	const response = await fetch('https://api.geekdo.com/api/trends/ownership?interval=week');

	const items: Kickstarter[] = (await response.json()).items;
	console.log(`${items?.length} most buyed found...`);
	const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
	const currentYear = new Date().getFullYear();

	if (items?.length > 0) {
		return json({
			status: 'ok',
			size: items.length,
			title: `BGG Most Buyed [${currentMonthName} - ${currentYear}]`,
			data: items.map((item) => ({
				id: item.id,
				name: item.item.name,
				url: item.item.href,
				thumbnail: item.item.imageSets?.mediacard?.src
			}))
		});
	}

	return json({
		status: 'ok',
		message: 'NOP'
	});
}
