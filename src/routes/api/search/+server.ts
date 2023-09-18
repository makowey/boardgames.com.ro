import {json} from '@sveltejs/kit';

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
    const response = await fetch('https://pionul.ro/index.php?route=journal2/search&search=' + search);
    let data = await response.json();
    data = [...data.results];
    const responseBody = {
        status: 'success',
        games: data,
        retailer: 'https://pionul.ro/image/cache/data/Daniel/logo-final-200x56.jpg'
    };

    return json(responseBody);

    // return new Response(JSON.stringify(responseBody), {
    // 	status: 200,
    // 	headers: { 'Content-Type': 'application/json' }
    // });
}
