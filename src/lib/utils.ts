import type {Game, Retailer} from "$lib/types";

export function stripHtml(value: string) {
    if (value === null || value?.length === 0) {
        return '';
    }

    return value?.replace(/(<([^>]+)>)/gi, "") || value;
}

export function extractFromHtml(dom: any, retailer: Retailer) {
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

    return games;
}