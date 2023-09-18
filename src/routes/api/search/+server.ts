import {json} from '@sveltejs/kit';
import {findRetailerByIndex} from "../../../component/retailers";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function GET({url, fetch}) {
    const search = url.searchParams.get('search');
    console.log(`Search for [${search}]`)
    if (search?.length < 3) {
        return new Response(JSON.stringify({}), {
            status: 403,
            headers: {'Content-Type': 'application/json'}
        });
    }

    let data: any[] = [];

    const PION: any = findRetailerByIndex('PION');
    let response = await fetch(PION.search + search);
    let dataPion = await response.json();
    dataPion = [...dataPion.results.map( game => {
        return {...game, retailer: PION}
    })];
    data = [...data, ...dataPion];

    const LEXSHOP: any = findRetailerByIndex('LEXSHOP');
    response = await fetch(LEXSHOP.search + search);
    let dataLexshop = await response.json();
    dataLexshop = [...dataLexshop.suggestions].map(game => {
        return {"name": game.value, "image": game.cover?.split("src=\"")[1]?.split("&crop=")[0], "url": LEXSHOP.site + game.link, "price": game.pret, retailer: LEXSHOP}
    });
    data = [...data, ...dataLexshop];

    return json({
        status: 'success',
        games: data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    });
}
