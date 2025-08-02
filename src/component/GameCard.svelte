<script lang="ts">
	import type { Game } from '$lib/types';
	import { HOW_TO_PLAY } from '$lib/retailers';

	export let game: Game;
	export let ribbonPosition = 'right';
</script>

<li
	class="card card-hover flex flex-col h-full shadow-xl hover:shadow-2xl rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 box {game.price ===
	'0'
		? 'hidden'
		: ''}"
>
	<div class="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
		<img
			class="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
			src={game.image}
			alt="Game thumbnail"
		/>
	</div>
	<div class="card-body p-2 flex flex-col">
		<!-- Retailer Logo Section -->
		<div class="mb-1">
			{#if game?.url?.indexOf('howtoplay') > -1}
				<img src={HOW_TO_PLAY.logo} class="w-12 px-1 py-0.5" alt="How To Play - suggestions..." />
				<span class="capitalize text-warning-400-800-token italic text-xs ml-12 absolute"
					>{game.retailer.name}</span
				>
			{:else}
				<img
					src={game.retailer.logo}
					alt={game.retailer.name}
					class="w-16 px-1 py-0.5 bg-gray-500 bg-opacity-66 rounded-xl"
				/>
			{/if}
		</div>

		<!-- Game Title -->
		<h2 class="card-title text-left font-semibold text-sm line-clamp-2 min-h-[2rem] mb-1">
			{@html game.name}
		</h2>

		<!-- Middle Content - no flex-1 to avoid extra space -->
		{#if game.notes}
			<span class="text-xs text-gray-600 block mb-1">{game.notes}</span>
		{/if}
		{#if game?.bggUser}
			<div class="badge bg-amber-600 rounded-full max-w-max text-black text-xs hover:scale-105 mb-2">
				<a href="/?q=@{game.bggUser}" target="_self">
					<div class="absolute -ml-2 mt-5">
						<img src={game.flagimgurl} alt={game.itemlocation} class="w-3 float-left" />
						<span class="float-left text-error-900-50-token text-xs">({game.itemlocation})</span>
					</div>
					BGG: @{game.bggUser}
				</a>
			</div>
		{/if}

		<!-- Bottom Section - Price and Button with minimal spacing -->
		<div class="pt-1 space-y-1">
			<div
				class="badge bg-gradient-to-r from-violet-400 to-purple-500 rounded-full text-white font-semibold text-xs px-2 py-1 shadow-sm hover:scale-105 transition-transform duration-200"
			>
				{@html game.price === '0' ? '?' : game.price} lei
			</div>
			<a
				href={game.url || game.retailer.site}
				target="_blank"
				class="btn btn-xs w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 font-medium rounded-full text-white text-xs shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
				>Mergi la magazin</a
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
