import {json} from '@sveltejs/kit';
import {findRetailerByIndex} from '$lib/retailers';
import type {Game, Retailer} from '$lib/types';
import {extractFromHtml} from "$lib/utils";
import {JSDOM} from 'jsdom';

export async function GET({url, fetch}) {
    const search = url.searchParams.get('search');
    console.log(`Search for [${search}]`);
    if (search && search.length < 3) {
        return new Response(JSON.stringify({}), {
            status: 403,
            headers: {'Content-Type': 'application/json'}
        });
    }

    let data: any[] = [];

    const PION: Retailer = findRetailerByIndex('PION');
    const LEXSHOP: Retailer = findRetailerByIndex('LEXSHOP');
    const OZONE: Retailer = findRetailerByIndex('OZONE');
    const RED_GOBLIN: Retailer = findRetailerByIndex('RED_GOBLIN');
    const KRIT: Retailer = findRetailerByIndex('KRIT');
    const BARLOG: Retailer = findRetailerByIndex('BARLOG');
    const GUILDHALL: Retailer = findRetailerByIndex('GUILDHALL');
    const GAMEOLOGY: Retailer = findRetailerByIndex('GAMEOLOGY');

    const startTime: Date = new Date();
    const [pionReq, lexshopReq, ozoneReq, redGoblinReq, kritReq, barlogReq, guildHallReq, gameologyReq] = await Promise.all([
        fetch(PION.search + search),
        fetch(LEXSHOP.search + search),
        fetch(OZONE.search + search),
        fetch(RED_GOBLIN.search + search),
        fetch(KRIT.search + search),
        fetch(BARLOG.search + search),
        fetch(GUILDHALL.search + search),
        fetch(GAMEOLOGY.search + search)
    ]);

    if (pionReq.ok && lexshopReq.ok && ozoneReq.ok && redGoblinReq.ok && kritReq.ok && barlogReq.ok && guildHallReq.ok && gameologyReq.ok) {

        let dataPion = await pionReq.json()
        dataPion = [
            ...dataPion.results.map((game: Game) => {
                return {
                    ...game,
                    image: game.image.replace('50x50', '500x500'),
                    retailer: PION
                };
            })
        ];
        data = [...data, ...dataPion];

        let dataLexshop = await lexshopReq.json()
        dataLexshop = [...dataLexshop.suggestions].map((game) => {
            return {
                name: game.value,
                image: game.cover?.split('src="')[1]?.split('&crop=')[0].replace('45-45', '500-500'),
                url: LEXSHOP.site + game.link,
                price: game.pret,
                retailer: LEXSHOP
            };
        });
        data = [...data, ...dataLexshop];

        let dataOzone = await ozoneReq.json()
        dataOzone = [...dataOzone.items].map((game) => {
            return {name: game.l, image: game.t2, url: game.u, price: game.p, retailer: OZONE};
        });
        data = [...data, ...dataOzone];

        let dataRedGoblin = await redGoblinReq.json()
        dataRedGoblin = dataRedGoblin
            .filter(game => game?.pname?.length > 0)
            .map((game) => {
                return {name: game.pname, image: game.img, url: game.link, price: game.price, retailer: RED_GOBLIN};
            });
        data = [...data, ...dataRedGoblin];

        let dataKrit = await kritReq.json()
        dataKrit = dataKrit?.data?.products?.filter(game => game?.title).map((game) => {
            const url = KRIT.site + "/" + game.slug;
            const image = KRIT.baseImageUrl?.replace("$$$", game.thumbnail);
            return {name: game.title, image: image, url: url, price: game.totalPrice, retailer: KRIT};
        });
        data = [...data, ...dataKrit];

        let dataBarlog: Game[] = [];
        let barlogContent: string = await barlogReq.text()
        barlogContent = barlogContent.split('<\\/style>')?.[1]?.split('","data":')[0]
            ?.replaceAll("\\n", '')?.replaceAll('\\t', '')
            ?.replaceAll('\\"', '"').replaceAll('\\/', '/');

        dataBarlog = extractFromHtml(new JSDOM(barlogContent), BARLOG);
        data = [...data, ...dataBarlog];

        let dataGuildHall: Game[] = [];
        let guildHallContent = await guildHallReq.text()
        guildHallContent = guildHallContent.split('<\\/style>')?.[1]?.split('","data":')[0]
            ?.replaceAll("\\n", '')?.replaceAll('\\t', '')
            ?.replaceAll('\\"', '"').replaceAll('\\/', '/');

        dataGuildHall = extractFromHtml(new JSDOM(guildHallContent), GUILDHALL);
        data = [...data, ...dataGuildHall];

        let dataGameology: Game[] = [];
        let gameologyContent = await gameologyReq.text()
        gameologyContent = gameologyContent.split('<\\/style>')?.[1]?.split('","data":')[0]
            ?.replaceAll("\\n", '')?.replaceAll('\\t', '')
            ?.replaceAll('\\"', '"').replaceAll('\\/', '/');

        dataGameology = extractFromHtml(new JSDOM(gameologyContent), GAMEOLOGY);
        data = [...data, ...dataGameology];

        console.log(`${data?.length} suggestion found...`)
        const endTime: Date = new Date();
        const executionTime: number = Math.abs(endTime.getMilliseconds() - startTime.getMilliseconds());
        return json({
            status: 'success',
            games: data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)),
            executionTime
        });
    }
}
