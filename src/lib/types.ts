export interface Game {
    name: string;
    image: string;
    thumbnail?: string;
    url: string;
    price: string;
    promotion?: number;
    progress?: number;
    yearpublished?: number;
    minplayers?: number;
    maxplayers?: number;
    playingtime?: number;
    rank?: number;
    description?: string;
    stoc?: string;
    videos?: never;
    condition?: string;
    bggUser?: string;
    flagimgurl?: string;
    itemlocation?: string;
    currency?: string;
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
    baseImageUrl?: string,
    maintainance?: boolean
}

export interface HowToPlay {
    "id": string,
    "name": string,
    "video_id": string,
    "channel_id": string,
    "published": string,
    "channel_name": string
}

export interface Kickstarter {
    name: string,
    progress: number,
    images: any,
    orrderUrl: string,
    pledged: number
}