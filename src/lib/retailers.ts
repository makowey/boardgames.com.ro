import type {Retailer} from "$lib/types";

// https://jocozaur.ro/search/suggest?q=brass&section_id=predictive-search
// https://www.transylvaniagames.com/rokanthemes_searchsuiteautocomplete/ajax/index/?q=brass

export const retailers: Retailer[] = [

    {
        name: "Pionul.ro",
        logo: "https://pionul.ro/image/cache/data/Daniel/logo-final-200x56.jpg",
        site: "https://pionul.ro",
        search: "https://pionul.ro/index.php?route=journal2/search&search=",
        index: "PION"
    },

    {
        name: "Lexshop.ro",
        logo: "https://d10w0d1gdgjea2.cloudfront.net/app/images/logo.png",
        site: "https://www.lexshop.ro/",
        search: "https://www.lexshop.ro/app/search.php?q=",
        index: "LEXSHOP"
    },

    {
        name: "Ozone.ro",
        logo: "https://www.ozone.ro/skin/frontend/stenik/site-ro/images/ozone.svg?ver=1",
        site: "https://ozone.ro",
        search: "https://api.fastsimon.com/?UUID=71de66ee-d2e2-4de2-b0bd-f51e3f0ee99e&q=joc:",
        index: "OZONE"
    },

    {
        name: "RedGoblin.ro",
        logo: "https://www.redgoblin.ro//img/logo-a-b.png",
        site: "https://redgoblin.ro",
        search: "https://www.redgoblin.ro/cauta?ajax=true&id_lang=2&maxRows=10&s=",
        index: "RED_GOBLIN"
    },

    {
        name: "Krit.ro",
        logo: "https://krit.ro/img/krit-logo-mobile.png",
        site: "https://krit.ro/produs/",
        search: "https://api.krit.ro/public/search/peek/",
        index: "KRIT",
        baseImageUrl: "https://krit-content.ams3.cdn.digitaloceanspaces.com/product-images/default_$$$.jpg"
    }
];

/**
 * @param {string} index
 */
export function findRetailerByIndex(index: string) {
    return retailers.find(r => r.index === index);
}