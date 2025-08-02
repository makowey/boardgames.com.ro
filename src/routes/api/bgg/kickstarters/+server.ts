// https://api.geekdo.com/api/ending_preorders

import { json } from '@sveltejs/kit';
import type { Kickstarter } from '$lib/types';

export async function GET({ fetch }) {
	console.log(`Search for [kickstarter list] on BGG`);
	const response = await fetch('https://api.geekdo.com/api/ending_preorders');

	const items: Kickstarter[] = await response.json();
	console.log(`${items?.length} Kickstarters found...`);

	if (items?.length > 0) {
		return json({
			status: 'ok',
			data: items
		});
	}

	return json({
		status: 'ok',
		message: 'NOP'
	});
}
