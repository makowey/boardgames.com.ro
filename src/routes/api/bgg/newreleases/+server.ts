// https://api.geekdo.com/api/newreleases

import { json } from '@sveltejs/kit';
import type { Game } from '$lib/types';

export async function GET({ fetch }) {
	console.log(`Search for [newReleases list] on BGG`);
	const response = await fetch('https://api.geekdo.com/api/newreleases');

	const items: Game[] = await response.json();
	console.log(`${items?.length} newReleases found...`);

	if (items?.length > 0) {
		return json({
			status: 'ok',
			size: items.length,
			data: items
		});
	}

	return json({
		status: 'ok',
		message: 'NOP'
	});
}
