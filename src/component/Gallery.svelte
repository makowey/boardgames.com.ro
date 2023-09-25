<script lang="ts">
    import type {Game} from "$lib/types.js";

    export let games:Game[] = [];
    export let selection: any;
</script>

{#if games?.length}
    <h3 class="h3 ml-10">Bgg hot list</h3>
    <div class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-4">
        {#each games as game}
            <div role="button" class="snap-start shrink-0 card card-hover py-20 px-2 w-40 md:w-80 text-center"
                 on:click={() => selection = game}>
                <img class="h-auto max-w-full rounded-lg"
                     src="{game.thumbnail}"
                     alt="{game.name}"/>
                <p class="text-sm mt-2 text-center italic">{game.rank} - {game.name}</p>
            </div>
        {/each}
    </div>
{/if}