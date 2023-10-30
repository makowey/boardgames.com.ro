import {json} from '@sveltejs/kit';
import {howtoplay} from '$lib/howtoplay';

export async function GET({url}) {

    if (url === undefined || url.searchParams.get('q') === null) {
        return json({
            status: 'success',
            games: howtoplay,
        });
    }

    const q = url.searchParams.get('q').replaceAll(' ', '+');
    if (q?.length > 0) {

        const response = await fetch('https://www.howtoplay.ro/api/get?&sort=3&stock=3&page=1&limit=100&search=' + q, {
            headers: {
                'Authorization': '3c55267c7d1099f5813f6b67fd2bf1f73f87'
            }
        })
        const results = await response.json();

        return json({
            status: 'success',
            // results,
            games: results.result.offers.map(offer => {
                return {
                    name: offer.name,
                    price: offer.price,
                    image: offer.image,
                    shop: offer.shop,
                    url: 'https://howtoplay.ro/go?product=' + offer.id,
                    promotion: offer.discount,
                    retailer: {
                        name: offer.shop,
                        logo: offer.icon,
                        url: offer.shop,
                        index: offer.shop.toUpperCase(),
                        search: '?q=' + offer.name
                    }
                }
            })
        })
    }
}
