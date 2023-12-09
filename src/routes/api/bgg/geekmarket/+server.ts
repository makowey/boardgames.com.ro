import {json} from "@sveltejs/kit";
import {BggClient} from "boardgamegeekclient";
import type {BggUserDto} from "boardgamegeekclient/dist/cjs/dto";
import type {Game, Retailer} from "$lib/types";
import {findRetailerByIndex} from "$lib/retailers";

const client = BggClient.Create();

export async function GET({fetch, url}) {
    const query = url.searchParams.get('q')?.replaceAll(' ', '+');
    const username = query?.startsWith('@') ? query?.replaceAll('@', '') : undefined;

    const GEEK_MARKET: Retailer = findRetailerByIndex('GEEK_MARKET');

    let allResults = [];
    const GEEK_MARKET_API = 'https://api.geekdo.com/api/market/products?ajax=1&country=RO&objecttype=thing';
    if (username) {
        const bggUsers: BggUserDto[] = await client.user.query({
            name: username || 'makowey'
        });
        const currentUser = bggUsers[0];
        console.log(`Search for [geekmarket list] on BGG for ${currentUser.name}`);

        const response = await fetch(`${GEEK_MARKET_API}&userid=` + currentUser.id);
        const result = await response.json();
        allResults = [...result?.products];
    } else {
        console.log(`Search for [geekmarket list] on BGG for gameName: [${query}]`);
        const response = await fetch(`/api/bgg/search?q=` + query);
        const results = await response.json();
        const suggestedIds = results?.data?.items?.map(i => i.id);

        for (const id of suggestedIds) {
            if (id > 0) {
                const localeResponse = await fetch(`${GEEK_MARKET_API}&objectid=` + id);
                const localResult = await localeResponse.json();

                if(localResult?.products?.length > 0) {
                    allResults = [...allResults, ...localResult.products.filter(p => parseInt(p.quantity) > 0)];
                }
            }
        }
    }

    if (allResults?.length === 0) {
        return json({
            status: 'ok',
            message: 'EMPTY',
            games: [],
        })
    }

    const games = allResults?.map(g => {
        return {
            name: g.version?.name,
            price: (g.price * 5).toFixed(2),
            image: g.objectlink?.image?.images?.large?.src,
            thumbnail: g.objectlink?.image?.images?.medium?.src,
            url: `https://boardgamegeek.com${g.producthref}`,
            condition: g.prettycondition,
            bggUser: g.linkeduser?.username,
            retailer: GEEK_MARKET
        }
    })

    const sold = games?.reduce((a: number, curr: Game) => a + parseFloat(curr.price), 0);
    console.log(`Loaded ${games?.length} GEEK_MARKET games [sold: ${sold}]...`);

    return json({
        status: 'ok',
        message: 'success',
        sold,
        games
    })
}