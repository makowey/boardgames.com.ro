import type {Retailer} from "$lib/types";

// https://jocozaur.ro/search/suggest?q=brass&section_id=predictive-search
// https://www.transylvaniagames.com/rokanthemes_searchsuiteautocomplete/ajax/index/?q=brass

export const retailers: Retailer[] = [

    {
        name: "RegatulJocurilor.ro",
        logo: "https://regatuljocurilor.ro/img/regatul-jocurilor-logo-1630002296.jpg",
        site: "https://regatuljocurilor.ro/",
        search: "https://regatuljocurilor.ro/modules/tmajaxsearch/tm_ajax_search.php?search_key=",
        index: "REGATUL",
        baseImageUrl: ""
    },
    
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
    },

    {
        name: "BarlogulCuJocuri.ro",
        logo: "https://gomagcdn.ro/domains/barlog/files/company/logo-barlogul-psd-4563025674.png",
        site: "https://www.barlogulcujocuri.ro/",
        search: "https://www.barlogulcujocuri.ro/autocomplete?query=",
        index: "BARLOG",
        baseImageUrl: ""
    },

    {
        name: "GuildHall.ro",
        logo: "https://gomagcdn.ro/domains/guildhall.ro/files/company/tgh-logo-horizontal-white-87150442254571.png",
        site: "https://shop.guildhall.ro",
        search: "https://shop.guildhall.ro/autocomplete?query=",
        index: "GUILDHALL",
        baseImageUrl: ""
    },

    {
        name: "Gameology.ro",
        logo: "https://gomagcdn.ro/domains/gameology.ro/files/company/logo-gameology-magazin-de-jocuri-de-societate9368.svg",
        site: "https://www.gameology.ro/",
        search: "https://www.gameology.ro/autocomplete?query=",
        index: "GAMEOLOGY",
        baseImageUrl: ""
    },

    {
        name: "MagazinulDeSah.ro",
        logo: "https://gomagcdn.ro/domains/magazinuldesah.ro/files/company/logo3246.png",
        site: "https://www.magazinuldesah.ro/",
        search: "https://www.magazinuldesah.ro/autocomplete?query=",
        index: "MAGAZINUL_DE_SAH",
        baseImageUrl: ""
    },

    {
        name: "Ludicus.ro",
        logo: "https://ludicus.ro/cdn/shop/files/Ludicus_Logo_Website_szinezett-02_180x@2x.png?v=1687429790",
        site: "https://ludicus.ro/",
        search: "https://ludicus.ro/search/suggest?resources%5Btype%5D=product&resources%5Blimit%5D=4&section_id=predictive-search&q=",
        index: "LUDICUS",
        baseImageUrl: ""
    },

    {
        name: "Jocozaur.ro",
        logo: "https://jocozaur.ro/cdn/shop/files/jocozaur-logo_92664226-5d7b-4ca7-b068-3139ad0d67fb.png?v=1630536455&width=400",
        site: "https://jocozaur.ro/",
        search: "https://jocozaur.ro/search/suggest?section_id=predictive-search&q=",
        index: "JOCOZAUR",
        baseImageUrl: ""
    }
];

export const OZONE: Retailer = {
    name: "Ozone.ro",
    logo: "https://www.ozone.ro/skin/frontend/stenik/site-ro/images/ozone.svg?ver=1",
    site: "https://ozone.ro",
    search: "https://api.fastsimon.com/?UUID=71de66ee-d2e2-4de2-b0bd-f51e3f0ee99e&q=joc:",
    index: "OZONE"
};

/**
 * @param {string} index
 */
export function findRetailerByIndex(index: string) {
    return retailers.find(r => r.index === index) || OZONE;
}