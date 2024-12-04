import {json} from "@sveltejs/kit";
import { BggSearchDto } from '@kfijolek/boardgamegeekclient/dist/cjs/dto';
import { BggClient } from '@kfijolek/boardgamegeekclient';

const client = BggClient.Create();

export async function GET({url}) {
    const q = url.searchParams.get('q').replaceAll(' ', '+');

    if(q === null || q?.length === 0) {
        return json({
            status: 'ok',
            data: []
        })
    }

    if(q.startsWith('$')) {
        return json({
            status: 'ok',
            data: [],
            message: 'bgg mark'
        })
    }

    const m = url.searchParams.get('m');
    console.log(`Search for [q:${q}]:[m:${m}] on BGG`);

    const items: BggSearchDto[] = await client.search.query({
        query: q.startsWith('a') ? '\''.concat(q) : q,
        exact: 0,
        type: "boardgame"
    });
    if (items?.length > 0) {
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