<script lang="ts">
    import SearchBar from './SearchBar.svelte';
    import Games from './Games.svelte';
    import {browser} from '$app/environment';
    import type {Game, Kickstarter} from '$lib/types';
    import LottieAnimation from "./player/LottieAnimation.svelte";
    import GameCardPresentation from "./GameCardPresentation.svelte";
    import {onMount} from "svelte";
    import Gallery from "./Gallery.svelte";
    import {GEEK_MARKET, retailers} from "$lib/retailers";
    import {SlideToggle} from "@skeletonlabs/skeleton";
    import Icon from "@iconify/svelte";

    export let findGame = '';
    let hTP: boolean = false;
    let games: Game[] = [];
    $: if (findGame?.length === 0) {
        games = [];
    }

    const numberOfMinimCharsForSearch = 3;

    let randomGameId = 1;
    let randomGame: Game;
    let hotGames: Game[] = [];
    let kickstarters: Game[] = [];
    let hotSelection: Game;
    let loading: boolean = false;
    let howToPlay: boolean = true;
    let shiparea = 'ro';

    $: if (hotSelection?.id) {
        randomGameId = hotSelection.id;
        loadGame(randomGameId)
    }

    onMount(() => {
        loadHotGames();
        loadKickstarters();
    });

    function loadGame(gameId: number) {
        loading = true;
        fetch('/api/bgg/game/' + gameId)
            .then(r => r.json())
            .then(r => {
                randomGame = r.data;
                loading = false;
            })
    }

    function loadHotGames() {
        fetch('/api/bgg/hot')
            .then(r => r.json())
            .then(r => {
                hotGames = r.data;
                randomGameId = pickARandomGameId();
                loadGame(randomGameId);
            })
    }

    function loadKickstarters() {
        fetch('/api/bgg/kickstarters')
            .then(r => r.json())
            .then(r => {
                kickstarters = r.data.map((k: Kickstarter) => {
                    return {
                        id: k.item?.id,
                        name: k.name,
                        thumbnail: k.images?.mediacard?.src,
                        url: k.orderUrl,
                        price: 0,
                        retailer: {name: "Kickstarter"},
                        progress: k.progress
                    }
                });
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
        return Math.floor(Math.random() * hotGames.length);
    }
</script>

<SearchBar placeholder="Caută board game(joc)..." bind:value={findGame} bind:gameId={randomGameId}/>

<div class="items-center -inset-x-1 flex justify-center">

    <img src="{GEEK_MARKET.logo}" alt="GeekMarget" class="h-8 mr-5"/>

    {#each ['ro', 'europe', 'eu'] as c}
        <button
                class="chip {shiparea === c ? 'variant-filled-success' : 'variant-filled-primary'} w-18 mx-0.5"
                on:click={() => shiparea = c }
                on:keypress
        >
            <span><Icon icon="flag:{c}-4x3" /></span>
            <span class="uppercase">{c}</span>
        </button>
    {/each}
</div>

{#if findGame?.length >= numberOfMinimCharsForSearch}
    <div class="mx-auto max-w-7xl px-6">
        {#if games.length > 0}
            <p class="italic mb-3 text-right">
                {games.length} sugestii pentru [{findGame.toUpperCase()}] de la <span
                    class="accent-error-200 font-bold text-cyan-600">{retailers.length}</span> magazine.
            </p>
        {/if}
        <div class="fixed bottom-0.5 right-1.5 scale-75 z-10">
            <img src="https://www.howtoplay.ro/logo.svg" class="w-12 h-6 place-self-center float-left"
                 alt="How To Play - suggestions..."/>
            <SlideToggle name="howToPlay" size="sm" bind:checked="{howToPlay}"
                         on:change={() => {
                             games = games.filter(game => (howToPlay && game?.shop) || (!howToPlay));
                             findGame = findGame.concat(' ');
                         }}/>
        </div>
        <Games searchText={findGame} bind:games {numberOfMinimCharsForSearch} {howToPlay} {shiparea}/>
    </div>
{:else }
    <Gallery title="BGG Hotlist" games={hotGames} bind:selection={hotSelection}/>

    {#if loading}
        <LottieAnimation path="handLoading"/>
    {:else }
        <GameCardPresentation game={randomGame} bind:hTP={hTP}/>
    {/if}

    <Gallery title="Kickstarters" games={kickstarters} bind:selection={hotSelection}/>
{/if}
