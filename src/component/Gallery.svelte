<script lang="ts">
    import type {Game} from "$lib/types.js";

    export let games: Game[] = [];
    export let selection: Game;
    export let title = "List";
</script>

{#if games?.length}
    <h3 class="h3 ml-10 mt-10 font-bold">{title}</h3>
    <div class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-4">
        {#each games as game, index}
            <div role="button" class="snap-start shrink-0 card py-8 px-2 w-48 text-center box"
                 on:click={() => selection = game}>
                <img class="h-auto max-w-full rounded-lg"
                     src="{game.thumbnail}"
                     alt="{game.name}"/>
                <p class="text-sm mt-2 text-center italic">{game.rank ? game.rank : index + 1} - {game.name}</p>
                {#if game.progress}
                    <div class="ribbon ribbon-top-right"><span>{game.progress}%</span></div>
                {/if}
            </div>
        {/each}
    </div>
{/if}