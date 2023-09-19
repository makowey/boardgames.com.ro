export const retailers = [

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
        search: "https://api.fastsimon.com/?UUID=71de66ee-d2e2-4de2-b0bd-f51e3f0ee99e&q=",
        index: "OZONE"
    }
];

/**
 * @param {string} index
 */
export function findRetailerByIndex(index) {
    return retailers.find(r => r.index === index);
}