<script lang="ts">
    import type {Game} from '$lib/types';
    import {HOW_TO_PLAY} from "$lib/retailers";

    export let game: Game;
    export let ribbonPosition = 'right';
</script>

<li class="card card-hover flex flex-col sm:flex-row shadow-2xl rounded-lg box {game.price === '0' ? 'hidden' : ''}">
    <div class="relative aspect-video overflow-hidden sm:aspect-square sm:max-w-[270px] bg-white">
        <img
                class="object-contain sm:object-cover w-full h-full"
                src={game.image}
                alt="Game thumbnail"
        />
    </div>
    <div class="card-body p-6 flex flex-col gap-3 flex-1">
        {#if game?.url?.indexOf('howtoplay') > -1}
            <img src="{HOW_TO_PLAY.logo}"
                 class="w-20 px-1.5 py-0.5"
                 alt="How To Play - suggestions..."/>
            <span class="capitalize text-warning-400-800-token italic ml-20 absolute">{game.retailer.name}</span>
        {:else}
            <img src={game.retailer.logo} alt={game.retailer.name}
                 class="w-24 px-1.5 py-0.5 bg-gray-500 bg-opacity-66 rounded-3xl"/>
        {/if}

        <h2 class="card-title text-left font-bold">
            {@html game.name}
        </h2>
        <div class="badge bg-violet-400 rounded-full max-w-max text-black text-xl">{@html game.price === '0' ? '?' : game.price } lei</div>
        {#if game.notes}
            <span class="text-xs">{game.notes}</span>
        {/if}
        {#if game?.bggUser}
            <div class="badge bg-amber-600 rounded-full max-w-max text-black text-md hover:scale-110">
                <a href="/?q=@{game.bggUser}" target="_self">
                    <div class="absolute -ml-2 mt-7">
                        <img src={game.flagimgurl} alt={game.itemlocation}
                             class="w-4 float-left"/>
                        <span class="float-left text-error-900-50-token">({game.itemlocation})</span>
                    </div>
                    BGG: @{game.bggUser}
                </a>
            </div>
        {/if}
        <div class="flex justify-end mt-auto w-full">
            <a
                    href={game.url || (game.retailer.site)}
                    target="_blank"
                    class="btn bg-yellow-400 font-bold rounded-md text-orange-950">Mergi la magazin</a
            >
        </div>
    </div>
    {#if game?.promotion && game.promotion > 0}
        <div class="ribbon ribbon-top-{ribbonPosition}"><span>{game.promotion}%</span></div>
    {/if}
    {#if game?.condition}
        <div class="ribbon ribbon-top-{ribbonPosition}"><span>{game.condition}</span></div>
    {/if}
</li>
