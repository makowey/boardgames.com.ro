import {json} from "@sveltejs/kit";
import {BggClient} from "boardgamegeekclient";
import type {BggUserDto} from "boardgamegeekclient/dist/cjs/dto";

const client = BggClient.Create();

export async function GET({fetch, url}) {
    const username = url.searchParams.get('q')?.replaceAll(' ', '+');

    const bggUsers: BggUserDto[] = await client.user.query({
        name: username || 'makowey'
    });

    const currentUser = bggUsers[0];
    console.log(`Search for [geekmarket list] on BGG for ${currentUser.name}`);

    const response = await fetch('https://api.geekdo.com/api/market/products?ajax=1&country=RO&userid=' + currentUser.id, {})
    const results = await response.json();

    console.log(`Loaded ${results?.products?.length} games...`);

    return json({
        status: 'ok',
        message: 'success',
        username: currentUser,
        games: results?.products?.map(g => {
            return {
                name: g.version?.name,
                price: (g.price * 4.95).toFixed(2),
                image: g.objectlink?.image?.images?.large?.src,
                thumbnail: g.objectlink?.image?.images?.medium?.src,
                url: `https://boardgamegeek.com${g.producthref}`,
                promotion: '5',
                retailer: {
                    name: 'GeekMarket',
                    logo: 'https://cf.geekdo-static.com/images/logos/geekmarket-logo_1.svg'
                }
            }
        })
    })
}