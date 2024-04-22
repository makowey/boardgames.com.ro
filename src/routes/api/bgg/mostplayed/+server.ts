// TOPIC
// https://boardgamegeek.com/thread/706785/bgg-top-50-most-played-subscription-thread/page/11
// https://api.geekdo.com/api/listitems?page=1&listid=
// OCT: 326185, NOV: 327111, DEC: 330951

import {json} from "@sveltejs/kit";

export async function GET({fetch}) {

    const currentMonthID: number = 335065;
    const currentMonthName: string = 'FEB';

    console.log(`Search for [mostplayed list for ${currentMonthName}] on BGG`);
    const response1 = await fetch(`https://api.geekdo.com/api/listitems?page=1&listid=${currentMonthID}`);
    const response2 = await fetch(`https://api.geekdo.com/api/listitems?page=2&listid=${currentMonthID}`);

    const data1 = await response1.json();
    let items = data1.data.map(d => {
        return {
            id: d.item.id,
            name: d.item.name,
            thumbnail: d.linkedImage?.image?.['src'],
            url: `https://boardgamegeek.com/${d.item.href}`,
            description: d.body
        }
    });

    const data2 = await response2.json();
    items = [...items, ...data2.data.map(d => {
        return {
            id: d.item.id,
            name: d.item.name,
            image: d.linkedImage?.image?.['src@2x'],
            thumbnail: d.linkedImage?.image?.['src'],
            url: `https://boardgamegeek.com/${d.item.href}`,
            description: d.body
        }
    })];

    console.log(`${items?.length} Games found...`)

    if (items?.length > 0) {
        return json({
            status: 'ok',
            size: items.length,
            currentMonth: currentMonthName,
            title: `BGG MostPlayed [${currentMonthName} 2024]`,
            data: items
        });
    }

    return json({
        status: 'ok',
        message: 'NOP'
    })
}