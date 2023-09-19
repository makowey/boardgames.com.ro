<script>
    import {Avatar} from "@skeletonlabs/skeleton";
    import LottieAnimation from "./player/LottieAnimation.svelte";
    import {fly} from "svelte/transition";

    export let games;
    export let searchText = "boardgame";
    let isNavigating = false;

    async function searchForGame() {
        isNavigating = true;
        const response = await fetch('/api/search?search=' + searchText);
        const data = await response.json();
        games = [...data.games];
        isNavigating = false;

        console.log(`Found ${games.length} games...`, games)
    }

    $: if (searchText?.length > 3) {
        searchForGame();
    }
</script>

{#if isNavigating}
    <LottieAnimation path="loading"/>
{:else if games?.length > 0}
    <ul class="list mt-1 w-7/12 lg:w-full mx-auto">
        {#each games as game, index}
            <li class="cursor-pointer btn variant-filled-secondary"
                on:click={() => window.open(game.url, '_blank')}
                in:fly={{ y: -100, duration: 500, delay: index * 100 }}>
                <span>
                    <img src="{game.retailer.logo}" alt="Retailer" width="55" height="15" class="left-0.5 pb-1"/>
                    <span class="max-w-64">
                        <Avatar src="{game.image}" class="rounded-full" alt="{game.name}"/>
                    </span>
                </span>
                <span class="flex-auto truncate">{game.name}</span>
                <span>{@html game.price}</span>
            </li>
        {/each}
    </ul>
{:else if searchText}
    <LottieAnimation/>
{/if}