<script>
    import {Avatar} from "@skeletonlabs/skeleton";
    import {goto} from "$app/navigation";

    let games;
    let retailer;
    export let searchText;

    async function searchForGame() {
        const response = await fetch('/api/search?search=' + searchText);
        const data = await response.json();
        games = [...data.games];
        retailer = data?.retailer;

        console.log(`Found ${games.length} games...`, games)
    }

    $: if (searchText?.length > 3) {
        searchForGame();
    }
</script>

{#if games?.length > 0}
    <ul class="list mt-2">
        {#each games as game}
            <li class="cursor-pointer btn variant-filled-secondary" on:click={() => goto(game.url)}>
                <span><Avatar src="{game.image}" class="rounded-full" alt="{game.name}"/></span>
                <img src="{retailer}" alt="Retailer" width="105" height="35"/>
                <span class="flex-auto">{game.name}</span>
                <span>{game.price}</span>
            </li>
        {/each}
        <!-- ... -->
    </ul>
{/if}