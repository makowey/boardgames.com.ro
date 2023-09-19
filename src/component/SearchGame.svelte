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
    {#if games.length > 0}
        <span class="text-right text-sm right-0.5 mr-20 italic mr-10">{games.length} jocuri gasite pentru `{findGame}`</span>
    {/if}

    <SearchBar placeholder="Cauta joc..." bind:value={findGame}/>

    {#if findGame?.length > 2}
        <Games searchText={findGame} bind:games/>
    {/if}
</main>
