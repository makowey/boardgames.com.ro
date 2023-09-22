import {json} from "@sveltejs/kit";
import {BggClient} from "boardgamegeekclient";
import type {BggSearchDto} from "boardgamegeekclient/dist/cjs/dto";

const client = BggClient.Create();

export async function GET({url}) {
    const q = url.searchParams.get('q');
    const m = url.searchParams.get('m');
    console.log(`Search for [q:${q}]:[m:${m}] on BGG`);

    const items: BggSearchDto[] = await client.search.query({query: q, exact: 0, type: "boardgame"});

    if(m === null) {
        return json({
            status: 'ok',
            data: items[0]
        });
    }

    return json({
        status: 'ok',
        message: 'NOP'
    })
}

// https://github.com/LearningProcesss/boardgamegeekjsclient