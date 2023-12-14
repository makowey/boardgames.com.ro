<script lang="ts">
    import type {Game} from "$lib/types";
    import {createEventDispatcher} from "svelte"

    const dispatch = createEventDispatcher()

    export let games: Game[] = [];
    export let selection: Game;
    export let title = "List";
    export let anchor = 'Title';

    function onLoad(event) {
        const {target} = event;
        dispatch("onLoad", {
            target, payload: {
                game: selection
            }
        });
    }
</script>

{#if games?.length}
    <h3 id="{anchor}" class="h3 ml-7 mt-10 font-bold galery-title animate-pulse text-sm lg:text-xl">
        {title}
    </h3>
    <div class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-4">
        {#each games as game, index}
            <div role="button" class="snap-start shrink-0 card py-8 px-2 w-48 text-center box"
                 on:click={(e) => {
                     selection = game;
                     onLoad(e);
                 }}>
                <img class="h-auto max-w-full rounded-lg"
                     src="{game.thumbnail}"
                     alt="{game.name}"/>
                <p class="text-sm mt-2 text-center italic">{game.rank ? game.rank + (game.rank > 0 ? ' - ' : '') : (index + 1) + ' - '}{game.name}</p>

                {#if game.description}
                    <p class="mt-1 font-serif max-h-36  scroll-py-4 overflow-auto" style="font-size: 10px;">
                        {@html game.description?.replaceAll("[b]", "<b>")?.replaceAll("[/b]", "</b>")?.replaceAll("\n", "</br>")}
                    </p>
                {/if}

                {#if game.progress}
                    <div class="ribbon ribbon-top-right"><span>{game.progress}%</span></div>
                {/if}
            </div>
        {/each}
    </div>
{/if}