<script lang="ts">
    import type {Game} from '$lib/types';

    export let game: Game;
</script>

<li class="card card-hover flex flex-col sm:flex-row shadow-2xl overflow-hidden rounded-lg box">
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
        <div class="badge bg-violet-400 rounded-full max-w-max text-black">{@html game.price}</div>
        <div class="flex justify-end mt-auto w-full">
            <a
                    href={game.url}
                    target="_blank"
                    class="btn bg-yellow-400 font-bold rounded-md text-orange-950">Mergi la magazin</a
            >
        </div>
    </div>
    {#if game?.promotion && game.promotion > 0}
        <div class="ribbon ribbon-top-left"><span>{game.promotion}%</span></div>
    {/if}
</li>

<style>
    .box {
        position: relative;
        box-shadow: 0 0 15px rgba(0, 0, 0, .1);
    }

    /* common */
    .ribbon {
        width: 150px;
        height: 150px;
        overflow: hidden;
        position: absolute;
    }

    .ribbon::before,
    .ribbon::after {
        position: absolute;
        z-index: -1;
        content: '';
        display: block;
        border: 5px solid #b929a6;
    }

    .ribbon span {
        position: absolute;
        display: block;
        width: 225px;
        padding: 15px 0;
        background-color: #ac34db;
        box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
        color: #fff;
        font: 700 18px/1 'Lato', sans-serif;
        text-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        text-transform: uppercase;
        text-align: center;
    }

    /* top left*/
    .ribbon-top-left {
        top: -10px;
        left: -10px;
    }

    .ribbon-top-left::before,
    .ribbon-top-left::after {
        border-top-color: transparent;
        border-left-color: transparent;
    }

    .ribbon-top-left::before {
        top: 0;
        right: 0;
    }

    .ribbon-top-left::after {
        bottom: 0;
        left: 0;
    }

    .ribbon-top-left span {
        right: -25px;
        top: 30px;
        transform: rotate(-45deg);
    }
</style>
