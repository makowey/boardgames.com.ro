import {json} from "@sveltejs/kit";
import {BggClient} from "boardgamegeekclient";
import type {BggHotDto} from "boardgamegeekclient/dist/cjs/dto";

const client = BggClient.Create();

export async function GET() {
    console.log(`Search for [hot list] on BGG`);

    const items: BggHotDto[] = await client.hot.query({
        type: "boardgame"
    });

    if (items?.length > 0) {
        return json({
            status: 'ok',
            data: items
        });
    }

    return json({
        status: 'ok',
        message: 'NOP'
    })
}

// https://github.com/LearningProcesss/boardgamegeekjsclient