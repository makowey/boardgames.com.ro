import {json} from '@sveltejs/kit';
import {findRetailerByIndex} from '$lib/retailers';
import type {Game, Retailer} from '$lib/types';
import {
    extractGoMagGamesFromHtml,
    extractPrestashopGamesFromHtml,
    extractShopifyGamesFromHtml,
    promotionCalculator
} from "$lib/utils";
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

    let games: Game[] = [];

    const PION: Retailer = findRetailerByIndex('PION');
    const LEXSHOP: Retailer = findRetailerByIndex('LEXSHOP');
    const OZONE: Retailer = findRetailerByIndex('OZONE');
    const RED_GOBLIN: Retailer = findRetailerByIndex('RED_GOBLIN');
    const KRIT: Retailer = findRetailerByIndex('KRIT');
    const BARLOG: Retailer = findRetailerByIndex('BARLOG');
    const GUILDHALL: Retailer = findRetailerByIndex('GUILDHALL');
    const GAMEOLOGY: Retailer = findRetailerByIndex('GAMEOLOGY');
    const MAGAZINUL_DE_SAH: Retailer = findRetailerByIndex('MAGAZINUL_DE_SAH');
    const LUDICUS: Retailer = findRetailerByIndex('LUDICUS');
    const JOCOZAUR: Retailer = findRetailerByIndex('JOCOZAUR');
    const REGATUL: Retailer = findRetailerByIndex('REGATUL');

    const startTime: Date = new Date();
    await Promise.allSettled([
        fetch(PION.search + search),
        fetch(LEXSHOP.search + search),
        fetch(OZONE.search + search),
        fetch(RED_GOBLIN.search + search),
        fetch(KRIT.search + search),
        fetch(BARLOG.search + search),
        fetch(GUILDHALL.search + search),
        fetch(GAMEOLOGY.search + search),
        fetch(MAGAZINUL_DE_SAH.search + search),
        fetch(LUDICUS.search + search),
        fetch(JOCOZAUR.search + search),
        fetch(REGATUL.search + search)
    ])
        .then(async ([pionResponse, lexshopResponse, ozoneResponse,
                         redGoblinResponse, kritResponse, barlogResponse,
                         guildHallResponse, gameologyResponse,
                         magazinulDeSahResponse, ludicusResponse,
                         jocozaurResponse, regatResponse]) => {

            if (pionResponse?.value) {
                let dataPion = await pionResponse.value.json()
                dataPion = [
                    ...dataPion.results.map((game: Game) => {
                        return {
                            ...game,
                            price: game?.special ? game.special : game.price,
                            promotion: game?.special ? promotionCalculator(parseInt(game.special), parseInt(game.price)) : 0,
                            image: game.image.replace('50x50', '500x500'),
                            retailer: PION
                        };
                    })
                ];
                games = [...games, ...dataPion];
            }

            if (lexshopResponse?.value) {
                let dataLexshop = await lexshopResponse.value.json()
                dataLexshop = [...dataLexshop.suggestions].map((game) => {
                    return {
                        name: game.value,
                        image: game.cover?.split('src="')[1]?.split('&crop=')[0].replace('45-45', '500-500'),
                        url: LEXSHOP.site + game.link,
                        price: game.pret,
                        retailer: LEXSHOP
                    };
                });
                games = [...games, ...dataLexshop];
            }

            if (ozoneResponse?.value) {
                let dataOzone = await ozoneResponse.value.json()
                dataOzone = [...dataOzone.items].map((game) => {
                    return {name: game.l, image: game.t2, url: game.u, price: game.p, promotion: promotionCalculator(game.p, game.p_c), retailer: OZONE};
                });
                games = [...games, ...dataOzone];
            }

            if (redGoblinResponse?.value) {
                let dataRedGoblin = await redGoblinResponse.value.json()
                dataRedGoblin = dataRedGoblin
                    .filter(game => game?.pname?.length > 0)
                    .map((game) => {
                        return {name: game.pname, image: game.img, url: game.link, price: game.price, retailer: RED_GOBLIN};
                    });
                games = [...games, ...dataRedGoblin];
            }

            if (kritResponse?.value) {
                let dataKrit = await kritResponse.value.json()
                dataKrit = dataKrit?.data?.products?.filter(game => game?.title).map((game) => {
                    const url = KRIT.site + "/" + game.slug;
                    const image = KRIT.baseImageUrl?.replace("$$$", game.thumbnail);
                    return {name: game.title, image: image, url: url, price: game.totalPrice, retailer: KRIT};
                });
                games = [...games, ...dataKrit];
            }

            if (barlogResponse?.value) {
                let dataBarlog: Game[] = [];
                let barlogContent: string = await barlogResponse.value.text()
                barlogContent = barlogContent.split('<\\/style>')?.[1]?.split('","games":')[0]
                    ?.replaceAll("\\n", '')?.replaceAll('\\t', '')
                    ?.replaceAll('\\"', '"').replaceAll('\\/', '/');

                dataBarlog = extractGoMagGamesFromHtml(new JSDOM(barlogContent), BARLOG);
                games = [...games, ...dataBarlog];
            }

            if (guildHallResponse?.value) {
                let dataGuildHall: Game[] = [];
                let guildHallContent = await guildHallResponse.value.text()
                guildHallContent = guildHallContent.split('<\\/style>')?.[1]?.split('","games":')[0]
                    ?.replaceAll("\\n", '')?.replaceAll('\\t', '')
                    ?.replaceAll('\\"', '"').replaceAll('\\/', '/');

                dataGuildHall = extractGoMagGamesFromHtml(new JSDOM(guildHallContent), GUILDHALL);
                games = [...games, ...dataGuildHall];
            }

            if (gameologyResponse?.value) {
                let dataGameology: Game[] = [];
                let gameologyContent = await gameologyResponse.value.text()
                gameologyContent = gameologyContent.split('<\\/style>')?.[1]?.split('","games":')[0]
                    ?.replaceAll("\\n", '')?.replaceAll('\\t', '')
                    ?.replaceAll('\\"', '"').replaceAll('\\/', '/');

                dataGameology = extractGoMagGamesFromHtml(new JSDOM(gameologyContent), GAMEOLOGY);
                games = [...games, ...dataGameology];
            }

            if (magazinulDeSahResponse?.value) {
                let dataMagazinuldeSah: Game[] = [];
                let magazinulDeSahContent = await magazinulDeSahResponse.value.text()
                magazinulDeSahContent = magazinulDeSahContent.split('<\\/style>')?.[1]?.split('","games":')[0]
                    ?.replaceAll("\\n", '')?.replaceAll('\\t', '')
                    ?.replaceAll('\\"', '"').replaceAll('\\/', '/');

                dataMagazinuldeSah = extractGoMagGamesFromHtml(new JSDOM(magazinulDeSahContent), MAGAZINUL_DE_SAH);
                games = [...games, ...dataMagazinuldeSah];
            }

            if (ludicusResponse?.value) {
                let dataLudicus: Game[] = [];
                const ludicusContent = await ludicusResponse.value.text();
                dataLudicus = extractShopifyGamesFromHtml(new JSDOM(ludicusContent), LUDICUS);
                games = [...games, ...dataLudicus];
            }

            if (jocozaurResponse?.value) {
                let dataJocozaur: Game[] = [];
                const jocozaurContent = await jocozaurResponse.value.text();
                dataJocozaur = extractShopifyGamesFromHtml(new JSDOM(jocozaurContent), JOCOZAUR);
                games = [...games, ...dataJocozaur];
            }

            if (regatResponse?.value) {
                let dataRegat: Game[] = [];
                const regatContent = await regatResponse.value.text();
                dataRegat = extractPrestashopGamesFromHtml(new JSDOM(regatContent), REGATUL);
                games = [...games, ...dataRegat];
            }

            console.log(`${games?.length} suggestion found...`)
        })

    const endTime: Date = new Date();
    const executionTime: number = Math.abs(endTime.getMilliseconds() - startTime.getMilliseconds());

    return json({
        status: 'success',
        games: games
            .sort((a, b) => (b.promotion - a.promotion) || (parseFloat(a.price) - parseFloat(b.price))),
        executionTime
    });
}
