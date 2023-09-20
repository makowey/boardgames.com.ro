<script lang="ts">
    import SearchBar from './SearchBar.svelte';
    import Games from './Games.svelte';
    import {browser} from '$app/environment';
    import type {Game} from '$lib/types';
    import LottieAnimation from "./player/LottieAnimation.svelte";

    export let findGame = '';
    let games: Game[] = [];

    $: if (browser && window.location.search) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        findGame = urlParams.get('q') || '';
    }

    let randomDice: number = 0;
    let currentFrame: number = 0;

    $: if (parseInt(currentFrame) === 21) {
        mix();
    }

    $: if (parseInt(currentFrame) === 90) {
        randomDice = 0;
    }

    function mix() {
        randomDice = Math.round(Math.random() * 12) + 1;
    }
</script>

<SearchBar placeholder="Cauta joc..." bind:value={findGame}/>

{#if findGame?.length > 2}
    <div class="mx-auto max-w-7xl px-6">
        {#if games.length > 0}
            <p class="italic mb-3 text-right">
                {games.length} intrari gasite pentru [{findGame.toUpperCase()}]
            </p>
        {/if}
        <Games searchText={findGame} bind:games/>
    </div>
{:else }
    <div>
        <LottieAnimation path="dice" bind:currentFrame>
            <p class="text-center text-3xl text-cyan-300 font-bold animate-pulse">{randomDice ? randomDice : ''}</p>
        </LottieAnimation>
    </div>
{/if}
