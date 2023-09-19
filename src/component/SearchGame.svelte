<script>
    import SearchBar from "./SearchBar.svelte";
    import Games from "./Games.svelte";
    import {browser} from "$app/environment";

    export let findGame = "";
    let games = [];

    $: if (browser && window.location.search) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        findGame = urlParams.get('q');
    }
</script>

<main>
    <div class="w-3/4 m-auto">
        <SearchBar placeholder="Cauta joc..." bind:value={findGame}/>
        {#if games.length > 0}
            <div class="text-sm right-0.5 m-auto italic">
                {games.length} intrari gasite pentru [{findGame}]
            </div>
        {/if}
    </div>

    {#if findGame?.length > 2}
        <div class="w-11/12 -ml-8">
            <Games searchText={findGame} bind:games/>
        </div>
    {/if}
</main>
