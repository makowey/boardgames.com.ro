<script>
    export let findGame;
</script>

<main>
    <input
            class="input"
            type="search"
            name="autocomplete-search"
            bind:value={findGame}
            placeholder="Cauta joc..."
    />

    {#if findGame}
        Se cauta dupa `{findGame}`...
    {/if}
</main>