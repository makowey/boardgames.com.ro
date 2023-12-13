<script lang="ts">
    import LottieAnimation from './player/LottieAnimation.svelte';
    import GameCard from './GameCard.svelte';
    import type {Game} from '$lib/types';
    import {loadingAnimations} from "$lib/stores.js";
    import Quote from "./Quote.svelte";
    import Icon from "@iconify/svelte";
    import GameListEntry from "./GameListEntry.svelte";

    export let games: Game[];
    export let searchText = 'boardgame';
    export let shiparea = 'ro';
    let isNavigating = false;
    let executionTime = 0;
    let sold = 0;
    export let howToPlay = false;
    export let numberOfMinimCharsForSearch = 3;

    async function searchForGame() {
        isNavigating = true;
        const response = await fetch(`/api/search?search=${searchText}&howToPlay=${howToPlay}&zone=${shiparea}`);
        const data = await response.json();
        games = [...data.games];
        executionTime = data.executionTime;
        sold = data.sold;
        isNavigating = false;
    }

    $: if (searchText?.length >= numberOfMinimCharsForSearch || shiparea) {
        games = [];
        searchForGame();
    }

    let sortDown: boolean = false;
    let grid: boolean = true;
</script>

{#if isNavigating}
    <Quote/>
    <LottieAnimation path={$loadingAnimations[Math.floor(Math.random() * $loadingAnimations.length)]}/>
{:else if games?.length > 0}
    <div class="flex-auto flex-2 float-left -mt-10 -mr-20">
        <button class="btn btn-icon relative" on:click={() => {sortDown = !sortDown}}>
            <Icon icon="mingcute:sort-{sortDown ? 'descending': 'ascending'}-fill" width="24"/>
        </button>
        <button class="btn btn-icon " on:click={() => {grid = !grid}}>
            <Icon icon={grid ? 'akar-icons:grid' : 'zondicons:list'} width="24"/>
        </button>
    </div>

    <ul class="{grid ? 'grid' : 'list'} lg:grid-cols-2 gap-3">
        {#each games.sort((a, b) => sortDown ? parseFloat(b.price) - parseFloat(a.price) : parseFloat(a.price) - parseFloat(b.price)) as game}
            {#if grid}
                <GameCard {game}/>
            {:else }
                <GameListEntry {game}/>
            {/if}
        {/each}
    </ul>

    {#if sold}
        <p class="text-xs text-left text-cyan-800">Sold: {sold} lei</p>
    {/if}

    <p class="text-xs text-right text-cyan-800">{executionTime}ms</p>
{:else if searchText}
    <LottieAnimation/>
{/if}
