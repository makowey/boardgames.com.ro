import {json} from "@sveltejs/kit";
import {BggClient} from "boardgamegeekclient";
import type {BggThingDto} from "boardgamegeekclient/dist/cjs/dto";

const client = BggClient.Create();

export async function GET({params}) {
    const id = params.id;
    console.log(`Search for [id: ${id}] on BGG`);

    const items: BggThingDto[] = await client.thing.query({
        id,
        videos: 1,
        comments: 0,
        marketplace: 1,
        stats: 1,
        type: "boardgame",
        pagesize: 10
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