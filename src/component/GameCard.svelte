<script lang="ts">
    import type {Game} from '$lib/types';

    export let game: Game;
</script>

<li class="card card-hover flex flex-col sm:flex-row shadow-2xl overflow-hidden rounded-lg">
    <div class="relative aspect-video overflow-hidden sm:aspect-square sm:max-w-[270px] bg-white">
        <img
                class="object-contain sm:object-cover w-full h-full"
                src={game.image}
                alt="Game thumbnail"
        />
    </div>
    <div class="card-body p-6 flex flex-col gap-3 flex-1">
        <img src={game.retailer.logo} alt={game.retailer.name} class="w-24 px-1.5 py-0.5 bg-gray-500 bg-opacity-66 rounded-3xl"/>
        <h2 class="card-title text-left font-bold">{@html game.name}</h2>
        <div class="badge bg-violet-400 rounded-full max-w-max text-black">{@html game.price}</div>
        {#if game?.promotion && game.promotion > 0}
            <div class="badge bg-red-600 rounded-full max-w-max text-black">{game.promotion}%</div>
        {/if}
        <div class="flex justify-end mt-auto w-full">
            <a
                    href={game.url}
                    target="_blank"
                    class="btn bg-yellow-400 font-bold rounded-md text-orange-950">Mergi la magazin</a
            >
        </div>
    </div>
</li>
