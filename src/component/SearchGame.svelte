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
    <LottieAnimation path="dice" moreClass="w-48"/>

{/if}
