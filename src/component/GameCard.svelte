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
        {#if game?.promotion && game.promotion > 0}
            <div class="ribbon">
                <span class="ribbon__content font-bold">{game.promotion}%</span>
            </div>
        {/if}
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
</li>

<style>
    .ribbon {
        width: 150px;
        height: 150px;
        overflow: hidden;
        position: absolute;
        top: -10px;
        right: -10px;

    }

    .ribbon__content {
        left: -25px;
        top: 30px;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        position: absolute;
        display: block;
        width: 225px;
        padding: 10px 0;
        background-color: #00aaa0;
        box-shadow: 0 0px 10px;
        color: #fff;
        text-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        text-transform: uppercase;
        text-align: center;
        border: 2px dotted #fff;
        outline: 5px solid #f5cd79;
    }

    .ribbon::before {
        top: 0;
        left: 0;
        position: absolute;
        z-index: -1;
        content: '';
        display: block;
        border: 5px solid #f19066;
        box-sizing: content-box;
    }

    .ribbon::after {
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;
        content: '';
        display: block;
        border: 5px solid #f19066;
    }
</style>
