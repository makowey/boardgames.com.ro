<script lang="ts">
    import type {Game} from '$lib/types';
    import {stripHtml} from "$lib/utils.js";

    export let game: Game = {};
</script>

{#if game?.name}
    <p class="ml-16 text-3xl">BGG: prezentare joc</p>
    <li class="card card-hover flex flex-col sm:flex-row shadow-2xl overflow-hidden rounded-lg m-10">
        <div class="relative aspect-video overflow-hidden sm:aspect-square sm:max-w-[270px] bg-white">
            <img
                    class="object-contain sm:object-cover w-full h-full"
                    src={game.image}
                    alt="Game thumbnail"
            />
        </div>
        <div class="card-body p-6 flex flex-col gap-3 flex-1">
            <h2 class="card-title text-left font-bold text-2xl animate-pulse">{game.name}</h2>
            <div class="badge bg-violet-400 rounded-full max-w-max text-black">{game.yearpublished}</div>
            <div>Players: {game.minplayers} - {game.maxplayers}, Playing time: {game.playingtime} min.</div>
            <div class="flex justify-end mt-auto w-full text-xsm italic flex-wrap">
                <p>{@html game.description}</p>
            </div>
        </div>
    </li>
{/if}