<script lang="ts">
    import type {Game} from '$lib/types';
    import Youtube from "svelte-youtube-embed";

    export let game: Game;
    let youtubeId: string;

    $: if (game?.videos?.total > 0) {
        const urls = game.videos.items?.filter(v => v.language === 'English');
        youtubeId = urls[Math.ceil(Math.random() * urls?.length)]?.link?.split('watch?v=')?.[1]
    }
</script>

{#if game?.name}
    <li class="card card-hover flex flex-col sm:flex-row shadow-2xl overflow-hidden rounded-lg m-10">
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
                <p class="text-sm italic">{@html game.description}</p>
            </div>

            {#if youtubeId}
                <div class="w-3/4 place-self-center">
                    <Youtube id="{youtubeId}"/>
                </div>
            {/if}
        </div>
    </li>
{/if}