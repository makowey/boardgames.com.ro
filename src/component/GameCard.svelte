<script lang="ts">
	import type { Game } from '$lib/types';
	import {stripHtml} from "$lib/utils.js";
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
		<img src={game.retailer.logo} alt={game.retailer.name} class="w-24" />
		<h2 class="card-title text-left font-bold">{game.name}</h2>
		<div class="badge bg-violet-400 rounded-full max-w-max text-black">{stripHtml(game.price)}</div>
		<div class="flex justify-end mt-auto w-full">
			<a
				href={game.url}
				target="_blank"
				class="btn bg-yellow-400 font-bold rounded-md text-orange-950">Mergi la magazin</a
			>
		</div>
	</div>
</li>
