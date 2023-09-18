<script>
    import SearchBar from "./SearchBar.svelte";
    import Games from "./Games.svelte";
    import {browser} from "$app/environment";

    export let findGame;

    $: if (browser && window.location.search) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        findGame = urlParams.get('q');
    }
</script>

<main>
    <SearchBar placeholder="Cauta joc..." bind:value={findGame}/>

    {#if findGame?.length > 2}
        <Games searchText={findGame}/>
    {/if}
</main>