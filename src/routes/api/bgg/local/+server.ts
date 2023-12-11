import {json} from "@sveltejs/kit";
import {bggDB} from "$lib/bggDB";
import type {BGGGame} from "$lib/types";

export async function GET({url}) {
    const q = url.searchParams.get('q') || '';
    const sizeQ = url.searchParams.get('size');
    let max: number = sizeQ === null || isNaN(sizeQ) ? 0 : parseInt(sizeQ);
    max = max < 100 ? max : 100;

    if ((q === null || q?.length < 3) && max == 0) {
        return json({
            status: 'ok',
            message: 'Use at least three characters in order to trigger the search...',
            data: []
        })
    }

    console.log(`Search for [q:${q}] [size: ${max}] on local BGG DB`);

    const items: BGGGame[] = max > 0 ?
        bggDB.slice(0, max) :
        bggDB.filter(game => game.Name.toLowerCase().indexOf(q.toLowerCase()) > -1);
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