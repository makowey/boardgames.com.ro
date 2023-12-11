import {json} from "@sveltejs/kit";
import {bggDB} from "$lib/bggDB";
import type {BGGGame} from "$lib/types";

export async function GET({url}) {
    const q = url.searchParams.get('q');

    if (q === null || q?.length < 3) {
        return json({
            status: 'ok',
            message: 'Use at least three characters in order to trigger the search...',
            data: []
        })
    }

    console.log(`Search for [q:${q}] on local BGG DB`);

    const items: BGGGame[] = bggDB.filter(game => game.Name.toLowerCase().indexOf(q.toLowerCase()) > -1);
    if (items?.length > 0) {
        return json({
            status: 'ok',
            size: items?.length,
            data: items
        });
    }

    return json({
        status: 'ok',
        message: 'NOP'
    })
}