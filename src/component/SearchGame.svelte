<script>
    import SearchBar from "./SearchBar.svelte";

    export let findGame;
</script>

<main>
    <SearchBar placeholder="Cauta joc..." bind:value={findGame}/>

    {#if findGame}
        Se cauta dupa `{findGame}`...
    {/if}
</main>