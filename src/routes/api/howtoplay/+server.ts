import {json} from '@sveltejs/kit';
import {howtoplay} from '$lib/howtoplay';

export async function GET() {
    return json({
        status: 'success',
        games: howtoplay,
    });
}
