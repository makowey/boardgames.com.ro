<script lang="ts">
    import LottieAnimation from './player/LottieAnimation.svelte';
    import GameCard from './GameCard.svelte';
    import type {Game} from '$lib/types';
    import {loadingAnimations} from "$lib/stores.js";

    export let games: Game[];
    export let searchText = 'boardgame';
    let isNavigating = false;
    let executionTime = 0;
    export let howToPlay = false;
    export let numberOfMinimCharsForSearch = 3;

    async function searchForGame() {
        isNavigating = true;
        const response = await fetch(`/api/search?search=${searchText}&howToPlay=${howToPlay}`);
        const data = await response.json();
        games = [...data.games];
        executionTime = data.executionTime;
        isNavigating = false;
    }

    $: if (searchText?.length >= numberOfMinimCharsForSearch) {
        searchForGame();
    }
</script>

{#if isNavigating}
    <LottieAnimation path={$loadingAnimations[Math.floor(Math.random() * $loadingAnimations.length)]}/>
{:else if games?.length > 0}
    <ul class="grid lg:grid-cols-2 gap-8">
        {#each games as game}
            <GameCard {game}/>
        {/each}
    </ul>
    <p class="text-xs text-right text-cyan-800">{executionTime}ms</p>
{:else if searchText}
    <LottieAnimation/>
{/if}
