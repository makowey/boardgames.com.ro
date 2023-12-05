<script lang="ts">
    import type {Game} from '$lib/types';

    export let game: Game;
    export let ribbonPosition = 'right';
</script>

<li class="card card-hover flex flex-col sm:flex-row shadow-2xl rounded-lg box">
    <div class="relative aspect-video overflow-hidden sm:aspect-square sm:max-w-[270px] bg-white">
        <img
                class="object-contain sm:object-cover w-full h-full"
                src={game.image}
                alt="Game thumbnail"
        />
    </div>
    <div class="card-body p-6 flex flex-col gap-3 flex-1">
        <img src={game.retailer.logo} alt={game.retailer.name}
             class="w-24 px-1.5 py-0.5 bg-gray-500 bg-opacity-66 rounded-3xl"/>
        <h2 class="card-title text-left font-bold">{@html game.name}</h2>
        <div class="badge bg-violet-400 rounded-full max-w-max text-black text-xl">{@html game.price}</div>
        <div class="flex justify-end mt-auto w-full">
            <a
                    href={game.url}
                    target="_blank"
                    class="btn bg-yellow-400 font-bold rounded-md text-orange-950">Mergi la magazin</a
            >
        </div>
    </div>
    {#if game?.promotion && game.promotion > 0}
        <div class="ribbon ribbon-top-{ribbonPosition}"><span>{game.promotion}%</span></div>
    {/if}
    {#if game?.condition}
        <div class="ribbon ribbon-top-{ribbonPosition}"><span>{game.condition}</span></div>
    {/if}
</li>
