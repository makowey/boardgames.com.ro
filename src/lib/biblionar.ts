import type { Game } from '$lib/types';
import { bggDB } from '$lib/bggDB';

const biblionar = [
	{
		id: '128',
		URL: 'https://biblionar.ro/games/takeiteasy'
	},
	{
		id: '385761',
		URL: 'https://biblionar.ro/games/faraway'
	}
];

export const playableGames: Game[] =
	bggDB
		.filter(g => biblionar.some(b => b.id === g.ID))
		.sort((a, b) => a.Average > b.Average ? -1 : 1)
		.map(g => {
			return {
				id: g.ID,
				name: g.Name,
				year: g.Year,
				thumbnail: g.Thumbnail,
				url: biblionar.findLast(b => b.id === g.ID)?.URL
			};
		});