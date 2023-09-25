<script lang="ts">
    import SearchBar from './SearchBar.svelte';
    import Games from './Games.svelte';
    import {browser} from '$app/environment';
    import type {Game} from '$lib/types';
    import LottieAnimation from "./player/LottieAnimation.svelte";
    import GameCardPresentation from "./GameCardPresentation.svelte";
    import {onMount} from "svelte";

    export let findGame = '';
    let games: Game[] = [];
    const numberOfMinimCharsForSearch = 3;

    let randomGameId = pickARandomGameId();
    let randomGame = {};

    onMount(() => {
        loadGame(randomGameId);
    })

    function loadGame(gameId: number) {
        fetch('/api/bgg/game/' + gameId)
            .then(r => r.json())
            .then(r => {
                randomGame = r.data;
            })
    }

    $: if (browser && window.location.search) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        findGame = urlParams.get('q') || '';
        randomGameId = pickARandomGameId();
    }

    let randomDice: number = 0;
    let currentFrame: string = "0";
    $: if (browser) loadGame(randomGameId);

    $: if (parseInt(currentFrame) === 21) {
        mix();
    }

    $: if (parseInt(currentFrame) < 1 || parseInt(currentFrame) > 90) {
        randomDice = 0;
    }

    function mix() {
        randomDice = Math.round(Math.random() * 12);
    }

    function pickARandomGameId() {
        return (Math.round(Math.random() * 299999)) + 1;
    }
</script>

<SearchBar placeholder="Caută board game(joc)..." bind:value={findGame} bind:gameId={randomGameId}/>

{#if findGame?.length >= numberOfMinimCharsForSearch}
    <div class="mx-auto max-w-7xl px-6">
        {#if games.length > 0}
            <p class="italic mb-3 text-right">
                {games.length} sugestii pentru [{findGame.toUpperCase()}]
            </p>
        {/if}
        <Games searchText={findGame} bind:games {numberOfMinimCharsForSearch}/>
    </div>
{:else }
    <GameCardPresentation game={randomGame}/>
    <div>
        <LottieAnimation path="dice" bind:currentFrame>
            <p class="text-center text-3xl  font-bold animate-pulse absolute mt-48 ml-72">{randomDice ? randomDice : '?'}</p>
        </LottieAnimation>
    </div>
{/if}
