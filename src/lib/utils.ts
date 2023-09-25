import type {Game, Retailer} from "$lib/types";

export function stripHtml(value: string) {
    if (value === null || value?.length === 0) {
        return '';
    }

    return value?.replace(/(<([^>]+)>)/gi, "") || value;
}

export function extractGoMagGamesFromHtml(dom: any, retailer: Retailer) {
    const el = dom.window.document;
    const games: Game[] = [];
    const childBoxes = el.getElementsByClassName('ac-box');
    for (let i = 0; i < childBoxes.length; i++) {
        const acBox = childBoxes[i];

        games.push({
            name: acBox.getElementsByClassName('ac-image')[0].getElementsByTagName('img')[0].alt,
            image: acBox.getElementsByClassName('ac-image')[0].getElementsByTagName('img')[0].src,
            url: acBox.getElementsByClassName('ac-image')[0]?.href,
            price: acBox.getElementsByClassName('text-main')[0]?.innerHTML,
            stoc: acBox.getElementsByClassName('ac-stock-status')[0]?.innerHTML,
            retailer
        });
    }

    console.log(`Filtering ${games.length} games for ${retailer.name}`);

    return games;
}

export function extractShopifyGamesFromHtml(dom: any, retailer: Retailer) {
    const el = dom.window.document;
    const games: Game[] = [];
    const childBoxes = el.getElementsByTagName('ul')[0].getElementsByTagName('li');
    for (let i = 0; i < childBoxes.length; i++) {
        const acBox = childBoxes[i];
        games.push({
            name: acBox.getElementsByTagName('a')[0]?.getElementsByTagName('img')[0].alt.replace("Imagine ", ''),
            image: acBox.getElementsByTagName('a')[0]?.getElementsByTagName('img')[0].src,
            url: retailer.site + acBox.getElementsByTagName('a')[0]?.href,
            price: acBox.getElementsByClassName('price-item--sale')[0]?.innerHTML,
            retailer
        });
    }

    console.log(`Filtering ${games.length} games for ${retailer.name}`);

    return games.filter(game => game.name !== undefined);
}

export function extractPrestashopGamesFromHtml(dom: any, retailer: Retailer) {
    const el = dom.window.document;
    const games: Game[] = [];
    const items = el.getElementsByClassName('results')[0].getElementsByClassName('item');
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        games.push({
            name: item.getElementsByTagName('a')[0]?.title,
            image: item.getElementsByTagName('a')[0]?.getElementsByTagName('img')[0].src,
            url: item.getElementsByTagName('a')[0]?.href,
            price: item.getElementsByClassName('price')[0]?.innerHTML || '?',
            retailer
        });
    }

    console.log(`Filtering ${games.length} games for ${retailer.name}`);

    return games.filter(game => game.name !== undefined);
}