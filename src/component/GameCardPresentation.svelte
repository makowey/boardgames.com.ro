<script lang="ts">
    import type {Game, HowToPlay} from '$lib/types';
    import Youtube from "svelte-youtube-embed";
    import {Table, tableMapperValues} from "@skeletonlabs/skeleton";
    import {stripHtml} from "$lib/utils.js";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";

    export let game: Game;
    let youtubeId: string;
    let sourceData = [];
    let howtoplay: HowToPlay[] = [];

    onMount(() => {
        fetch('/api/howtoplay')
            .then(r => r.json())
            .then(r => {
                howtoplay = r.games;
            });
    })
    let tableSimple: any;
    $: if (game?.videos?.total > 0) {
        const urls = game.videos.items?.filter(v => v.language === 'English');
        youtubeId = urls[Math.ceil(Math.random() * urls?.length)]?.link?.split('watch?v=')?.[1]
    }

    $: if (howtoplay?.length > 0 && game?.name) {
        const howToPlaySuggestions = howtoplay.filter(g => g.name.indexOf(game?.name) > -1);
        if (howToPlaySuggestions?.length > 0) {
            youtubeId = howToPlaySuggestions[Math.floor(Math.random() * howToPlaySuggestions.length)].video_id;
        }
    }

    $: if (game?.marketplacelistings?.length > 0) {
        let counter = 0;
        sourceData =
            game?.marketplacelistings
                .filter(list => list.price.currency === 'EUR')
                .map(list => {
                    return {
                        position: ++counter,
                        name: stripHtml(list.notes).substring(0, 100).concat("..."),
                        condition: list.condition,
                        price: (list.price.value * 4.9677).toFixed(2),
                        url: list.link.href
                    }
                });

        tableSimple = {
            // A list of heading labels.
            head: ['Pozitie', 'Descriere', 'Stare', 'RON'],
            // The data visibly shown in your table body UI.
            body: tableMapperValues(sourceData, ['position', 'name', 'condition', 'price']),
            // Optional: The data returned when interactive is enabled and a row is clicked.
            meta: tableMapperValues(sourceData, ['position', 'name', 'price', 'currency', 'url']),
            foot: ['Media', '', '', `<code class="code">${(sourceData.map(l => l.price).reduce((a, b) => parseInt(a) + parseInt(b)) / sourceData?.length).toFixed(2)} RON</code>`]
        };
    }
</script>

{#if game?.name}
    <div class="card card-hover flex flex-col sm:flex-row shadow-2xl overflow-hidden rounded-lg m-10">
        <div class="relative aspect-video overflow-hidden sm:aspect-square sm:max-w-[270px] bg-white">
            <img
                    class="object-contain sm:object-cover w-full h-full"
                    src={game.image}
                    alt="Game thumbnail"
            />
        </div>
        <div class="card-body p-6 flex flex-col gap-3 flex-1">
            <h2 class="card-title text-left font-bold text-2xl animate-pulse">{@html game.name}</h2>
            <div class="badge bg-violet-400 rounded-full max-w-max text-black">{game.yearpublished}</div>
            <div>Players: {game.minplayers} - {game.maxplayers}, Playing time: {game.playingtime} min.</div>
            <div class="flex justify-end mt-auto w-full flex-wrap">
                <p class="text-3xl italic">
                </p>
            </div>

            <a href="https://www.howtoplay.ro/oferte-boardgames/{game.name}" target="_blank" class="place-self-end">
                <img src="https://www.howtoplay.ro/logo.svg" alt="How to play {game?.name}?" width="150"/>
            </a>
            {#if youtubeId}
                <div class="w-fit place-self-center">
                    <Youtube id="{youtubeId}"/>
                </div>
            {/if}
        </div>
    </div>

    {#if tableSimple}
        <div class="card m-10 w-3/4 place-self-center">
            <h4 class="h4 card-header p-2 text-lime-600">Geek market list(EURopa):</h4>
            <Table source={tableSimple} interactive={true}
                   on:selected={(e) => goto(e.detail[4], {replaceState: false})}/>
        </div>
    {/if}
{/if}