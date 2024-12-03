import {json} from '@sveltejs/kit';
import {findRetailerByIndex} from '$lib/retailers';
import type {Game, Retailer} from '$lib/types';
import {
    extractFromRedGoblinHtml,
    extractGoMagGamesFromHtml,
    extractPrestashopGamesFromHtml,
    extractShopifyGamesFromHtml, extractShopifyGamesFromHtmlJOCOZAUR, extractShopifyGamesFromHtmlLUDICUS,
    promotionCalculator
} from '$lib/utils';
import {JSDOM} from 'jsdom';

export async function GET({url, fetch}) {
    const search = url.searchParams.get('search');
    const zone = url.searchParams.get('zone');
    const howToPlay: boolean = url.searchParams.get('howToPlay') === 'true';

    console.log(`Search for [${search}], [howToPlay: ${howToPlay}]`);

    if (search && search.length < 3) {
        return new Response(JSON.stringify({}), {
            status: 403,
            headers: {'Content-Type': 'application/json'}
        });
    }

    let games: Game[] = [];
    const startTime: Date = new Date();

    try {
        if (search?.startsWith("@")) {
            const response = await fetch(`/api/bgg/geekmarket?q=${search}`);
            const responseJSON: Game[] = await response.json();
            games = [...responseJSON.games];

            const endTime: Date = new Date();
            const executionTime: number = Math.abs(endTime.getMilliseconds() - startTime.getMilliseconds());

            return json({
                status: 'success',
                sold: responseJSON.sold,
                games: games
                    .sort((a, b) => (b.promotion - a.promotion) || (parseFloat(a.price) - parseFloat(b.price))),
                executionTime
            });
        }
    } catch (e) {
        console.error(`Exception for Fast LOADING: ${e?.message}`);
    }

    const req = await fetch(`bgg/search?q=${search}`);
    const gs = await req.json();
    const gameIDs = gs.data.items?.map(g => g.id) ?? [];
    // console.log(gameIDs);

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
    const BOARDIACS: Retailer = findRetailerByIndex('BOARDIACS');
    const REGATUL: Retailer = findRetailerByIndex('REGATUL');
    const GEEK_MARKET: Retailer = findRetailerByIndex('GEEK_MARKET');

    if(gameIDs.length > 0) {
        console.log(gameIDs);
        const boardiacsFetches = gameIDs.slice(0, 10).map(id => {
            return fetch(BOARDIACS.search, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: JSON.stringify({
                    id
                })
            });
        });

        const raftulCuJocuri = await Promise.allSettled(boardiacsFetches);
        raftulCuJocuri.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                result.value.json()
                  .then((boardiacsContent: any) => {
                      if (Array.isArray(boardiacsContent)) {
                          const dataBoardiacs: Game[] = boardiacsContent.map(g => {
                              return {
                                  ...g,
                                  image: g.thumbnail,
                                  url: `${BOARDIACS.site}/list/${g.list_id}#${g.id}`,
                                  retailer: BOARDIACS
                              }
                          }).filter(g => g.status === 'available');
                          if(dataBoardiacs.length > 0) {
                              games = [...games, ...dataBoardiacs];
                          }
                          console.log(`${BOARDIACS.site}: ${dataBoardiacs.length} games...`);
                      }
                  });
            } else {
                console.error(`Fetch ${index} failed with reason:`, result.reason);
            }
        });
    }

    // return json({
    //     status: 'success',
    //     games: games.sort((a: Game, b: Game) => parseFloat(b.price) - parseFloat(a.price)),
    // });

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
        // boardiacsFetches,
        fetch(REGATUL.search + search),
        fetch(`${GEEK_MARKET.search}${search}&zone=${zone}`)
    ])
        .then(async ([pionResponse, lexshopResponse, ozoneResponse,
                         redGoblinResponse, kritResponse, barlogResponse,
                         guildHallResponse, gameologyResponse,
                         magazinulDeSahResponse, ludicusResponse,
                         jocozaurResponse, regatResponse, geekMarketResponse]) => {

                try {
                    if (pionResponse?.value) {
                        let dataPion = await pionResponse.value.json()
                        dataPion = [
                            ...dataPion.response
                                .filter(g => g?.product_id)
                                .map((game: Game) => {
                                    return {
                                        ...game,
                                        price: game?.special ? game.special : game.price,
                                        promotion: game?.special ? promotionCalculator(parseInt(game.special), parseInt(game.price)) : 0,
                                        image: game?.thumb2?.replace('120x120', '500x500'),
                                        url: game.href,
                                        retailer: PION
                                    };
                                })
                        ];
                        games = [...games, ...dataPion];
                    }
                } catch (e) {
                    console.error(`Exception for PION: ${e?.message}`);
                }

                try {
                    if (lexshopResponse?.value) {
                        let dataLexshopContent = await lexshopResponse.value.text()
                        const obj = JSON.parse(dataLexshopContent);
                        const html = obj.suggestions?.[0]?.value;
                        let dataLexshop = extractShopifyGamesFromHtml(new JSDOM(html), LEXSHOP);
                        games = [...games, ...dataLexshop];
                    }
                } catch (e) {
                    console.error(`Exception for LEXSHOP: ${e?.message}`);
                }

                try {
                    if (ozoneResponse?.value) {
                        let dataOzone = await ozoneResponse.value.json()
                        dataOzone = [...dataOzone.items].map((game) => {
                            return {
                                name: game.l,
                                image: game.t2,
                                url: game.u,
                                price: game.p,
                                promotion: promotionCalculator(game.p, game.p_c),
                                retailer: OZONE
                            };
                        });
                        games = [...games, ...dataOzone];
                    }
                } catch (e) {
                    console.error(`Exception for OZONE: ${e?.message}`);
                }

                try {
                    if (redGoblinResponse?.value) {
                        let dataRedGoblin = await redGoblinResponse.value.text();
                        if (dataRedGoblin.indexOf('search-flydown__no-results') == -1) {
                            dataRedGoblin = extractFromRedGoblinHtml(new JSDOM(dataRedGoblin), RED_GOBLIN);
                            games = [...games, ...dataRedGoblin];
                        }
                    }
                } catch (e) {
                    console.error(`Exception for RedGoblin: ${e?.message}`);
                }

                try {
                    if (kritResponse?.value) {
                        let dataKrit = await kritResponse.value.json()
                        dataKrit = dataKrit?.data?.products?.filter(game => game?.title).map((game) => {
                            const url = KRIT.site + "/" + game.slug;
                            const image = KRIT.baseImageUrl?.replace("$$$", game.thumbnail);
                            return {name: game.title, image: image, url: url, price: game.totalPrice, retailer: KRIT};
                        });
                        games = [...games, ...dataKrit];
                    }
                } catch (e) {
                    console.error(`Exception for KRIT: ${e?.message}`);
                }

                try {
                    if (barlogResponse?.value) {
                        let dataBarlog: Game[] = [];
                        let barlogContent: string = await barlogResponse.value.text()
                        barlogContent = barlogContent.split('<\\/style>')?.[1]?.split('","games":')[0]
                            ?.replaceAll("\\n", '')?.replaceAll('\\t', '')
                            ?.replaceAll('\\"', '"').replaceAll('\\/', '/');

                        dataBarlog = extractGoMagGamesFromHtml(new JSDOM(barlogContent), BARLOG);
                        games = [...games, ...dataBarlog];
                    }
                } catch (e) {
                    console.error(`Exception for BARLOG: ${e?.message}`);
                }

                try {
                    if (guildHallResponse?.value) {
                        let dataGuildHall: Game[] = [];
                        let guildHallContent = await guildHallResponse.value.text()
                        guildHallContent = guildHallContent.split('<\\/style>')?.[1]?.split('","games":')[0]
                            ?.replaceAll("\\n", '')?.replaceAll('\\t', '')
                            ?.replaceAll('\\"', '"').replaceAll('\\/', '/');

                        dataGuildHall = extractGoMagGamesFromHtml(new JSDOM(guildHallContent), GUILDHALL);
                        games = [...games, ...dataGuildHall];
                    }
                } catch (e) {
                    console.error(`Exception for GuildHall: ${e?.message}`);
                }

                try {
                    if (gameologyResponse?.value) {
                        let dataGameology: Game[];
                        let gameologyContent = await gameologyResponse.value.text()
                        gameologyContent = gameologyContent.split('<\\/style>')?.[1]?.split('","games":')[0]
                            ?.replaceAll("\\n", '')?.replaceAll('\\t', '')
                            ?.replaceAll('\\"', '"').replaceAll('\\/', '/');

                        dataGameology = extractGoMagGamesFromHtml(new JSDOM(gameologyContent), GAMEOLOGY);
                        games = [...games, ...dataGameology];
                    }
                } catch (e) {
                    console.error(`Exception for Gameology: ${e?.message}`);
                }

                try {
                    if (magazinulDeSahResponse?.value) {
                        let dataMagazinuldeSah: Game[];
                        let magazinulDeSahContent = await magazinulDeSahResponse.value.text()
                        magazinulDeSahContent = magazinulDeSahContent.split('<\\/style>')?.[1]?.split('","games":')[0]
                            ?.replaceAll("\\n", '')?.replaceAll('\\t', '')
                            ?.replaceAll('\\"', '"').replaceAll('\\/', '/');

                        dataMagazinuldeSah = extractGoMagGamesFromHtml(new JSDOM(magazinulDeSahContent), MAGAZINUL_DE_SAH);
                        games = [...games, ...dataMagazinuldeSah];
                    }
                } catch (e) {
                    console.error(`Exception for MAGAZINUL DE SAH: ${e?.message}`);
                }

                try {
                    if (ludicusResponse?.value) {
                        let dataLudicus: Game[];
                        const ludicusContent = await ludicusResponse.value.text();
                        dataLudicus = extractShopifyGamesFromHtmlLUDICUS(new JSDOM(ludicusContent), LUDICUS);
                        games = [...games, ...dataLudicus];
                    }
                } catch (e) {
                    console.error(`Exception for LUDICUS: ${e?.message}`);
                }

                try {
                    if (jocozaurResponse?.value) {
                        let dataJocozaur: Game[];
                        const jocozaurContent = await jocozaurResponse.value.text();
                        dataJocozaur = extractShopifyGamesFromHtmlJOCOZAUR(new JSDOM(jocozaurContent), JOCOZAUR);
                        games = [...games, ...dataJocozaur];
                    }
                } catch (e) {
                    console.error(`Exception for JOCOZAUR: ${e?.message}`);
                }

                // try {
                //     if (boardiacsResponse?.value) {
                //        const v = await boardiacsResponse.value;
                //        const val = await v.text();
                //        console.log(val)
                //
                //         const boardiacsContent = await boardiacsResponse.value.json();
                //         if(Array.isArray(boardiacsContent)) {
                //             const dataBoardiacs: Game[] = boardiacsContent.map(g => {
                //                 return {
                //                     ...g,
                //                     image: g.thumbnail,
                //                     url: `${BOARDIACS.site}/list/${g.list_id}#${g.id}`,
                //                     retailer: BOARDIACS
                //                 }
                //             }).filter(g => g.status === 'available');
                //             games = [...games, ...dataBoardiacs];
                //             // console.log('BOARDIACS: ', dataBoardiacs);
                //         }
                //     }
                // } catch (e) {
                //     console.error(`Exception for BOARDIACS: ${e?.message}`);
                // }

                try {
                    if (regatResponse?.value) {
                        let dataRegat: Game[];
                        const regatContent = await regatResponse.value.text();
                        dataRegat = extractPrestashopGamesFromHtml(new JSDOM(regatContent), REGATUL);
                        games = [...games, ...dataRegat];
                    }
                } catch (e) {
                    console.error(`Exception for REGATUL: ${e?.message}`);
                }

                try {
                    if (geekMarketResponse?.value) {
                        let geekmarketGames: Game[];
                        const geekmarketContent = await geekMarketResponse.value.json();
                        geekmarketGames = geekmarketContent?.games;
                        games = [...games, ...geekmarketGames];
                    }
                } catch (e) {
                    console.error(`Exception for GEEK_MARKET: ${e?.message}`);
                }


                if (howToPlay) {
                    const response = await fetch('/api/howtoplay?q=' + search);
                    const responseJSON: Game[] = await response.json();
                    const htpGames: Game[] = []
                    responseJSON.games.forEach(game => {
                        const index = games.findIndex(g => game.name === g.name && game.retailer?.logo?.indexOf(g.retailer.site) > -1);
                        game.promotion = parseFloat(game.promotion);
                        if (index > -1 && isNaN(games[index]?.price)) {
                            games[index].price = game.price;
                        } else if (['IBG.RO', 'LIBRARIE.NET', 'CARTURESTI', 'REGATUL JOCURILOR', 'MINDSPOT', 'ELEFANT.RO']
                                .filter(i => i === game.retailer.index).length === 1 &&
                            game.retailer?.name?.indexOf('Geek Market') == -1) {
                            htpGames.push(game);
                        }
                    })

                    console.log(`Filtered ${htpGames.length} HowToPlay suggestions...`);
                    games = [...games, ...htpGames];
                }

                if (search?.split(' ')?.length === 1) {
                    console.log(`Filtering from ${games?.length} suggestions for single term [${search}]...`);
                    games = games.filter(game => game.name?.toLowerCase().indexOf(search.trim().toLowerCase()) > -1);
                }
            }
        )

    console.log(`Sorting ${games.length} results...`)
    const endTime: Date = new Date();
    const executionTime: number = Math.abs(endTime.getMilliseconds() - startTime.getMilliseconds());

    games.forEach(game => {
        if (game.price != undefined && isNaN(parseFloat(game.price))) {
            game.price = game.price.toLowerCase()?.replace('lei', '')?.replace('ron', '');
        }

        if (isNaN(parseFloat(game.price))) {
            game.price = "0";
        }
    })

    return json({
        status: 'success',
        games: games.sort((a: Game, b: Game) => parseFloat(b.price) - parseFloat(a.price)),
        executionTime
    });
}
