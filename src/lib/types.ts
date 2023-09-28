export interface Game {
    name: string;
    image: string;
    thumbnail?: string;
    url: string;
    price: string;
    promotion?: number;
    yearpublished?: number;
    minplayers?: number;
    maxplayers?: number;
    playingtime?: number;
    rank?: number;
    description?: string;
    stoc?: string;
    videos?: never;
    marketplacelistings?: never;
    retailer: {
        name: string;
        logo: string;
        site: string;
        search: string;
        index: string;
    };
}

export interface Retailer {
    name: string,
    logo: string,
    site: string,
    search: string,
    index: string,
    baseImageUrl?: string
}

export interface HowToPlay {
    "id": string,
    "name": string,
    "video_id": string,
    "channel_id": string,
    "published": string,
    "channel_name": string
}
