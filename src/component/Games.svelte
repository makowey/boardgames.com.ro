<script>
    import {Avatar} from "@skeletonlabs/skeleton";
    import {goto} from "$app/navigation";
    import LottieAnimation from "./player/LottieAnimation.svelte";

    export let games;
    export let searchText;

    async function searchForGame() {
        const response = await fetch('/api/search?search=' + searchText);
        const data = await response.json();
        games = [...data.games];

        console.log(`Found ${games.length} games...`, games)
    }

    $: if (searchText?.length > 3) {
        searchForGame();
    }
</script>

{#if games?.length > 0}
    <ul class="list mt-2">
        {#each games as game}
            <li class="cursor-pointer btn variant-filled-secondary" on:click={() => window.open(game.url, '_blank')}>
                <span><Avatar src="{game.image}" class="rounded-full" alt="{game.name}"/></span>
                <img src="{game.retailer.logo}" alt="Retailer" width="105" height="35"/>
                <span class="flex-auto truncate">{game.name}</span>
                <span>{@html game.price}</span>
            </li>
        {/each}
    </ul>
{:else if searchText}
    <LottieAnimation/>
{/if}