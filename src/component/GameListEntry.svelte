<script lang="ts">
    import type {Game} from '$lib/types';
    import {Avatar} from "@skeletonlabs/skeleton";

    export let game: Game;
    export let ribbonPosition = 'right';
</script>

<li class="grid grid-cols-3 divide-x card card-hover {game.price === '0' || game.price === '?' ? 'hidden' : ''}">
    <div class="m-2">
        <Avatar
                src={game.image}
                width="w-8"
                rounded="rounded-full"
                alt="{game.name} thumbnail"
                border="border-4 border-surface-300-600-token hover:!border-primary-500"
                cursor="cursor-pointer"
        />
    </div>
    <div class="w-full">
        <a href={game.url || (game.retailer.site)} target="_blank" class="text-md font-serif">
            <div class="float-left">
                <img src={game.retailer.logo} alt={game.retailer.name}
                     class="w-12 px-1.5 py-0.5"/>
            </div>
            <div class="relative ml-2">
                {@html game.name}
            </div>
        </a>
        {#if game?.bggUser}
            <a href="/?q=@{game.bggUser}" target="_self">
                <img src={game.flagimgurl} alt={game.itemlocation}
                     class="w-4 float-left"/>
                <span class="float-left text-xs">BGG: @{game.bggUser}</span>
            </a>
        {/if}
    </div>
    <div class="text-black text-xs text-center w-2/12 m-2 font-serif">
        {@html game.price === '0' ? '?' : game.price }
    </div>

</li>
