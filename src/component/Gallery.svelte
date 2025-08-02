<script lang="ts">
	import type { Game } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let games: Game[] = [];
	export let selection: Game;
	export let title = 'List';
	export let anchor = 'Title';

	function onLoad(event) {
		const { target } = event;
		dispatch('onLoad', {
			target,
			payload: {
				game: selection
			}
		});
	}
</script>

{#if games?.length}
	<div
		class={anchor === 'top50'
			? 'bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mt-8'
			: 'mt-8'}
	>
		<h3
			id={anchor}
			class="h3 ml-7 mb-4 font-bold galery-title {anchor === 'top50'
				? 'text-2xl lg:text-3xl text-indigo-800'
				: 'animate-pulse text-sm lg:text-xl'}"
		>
			{#if anchor === 'top50'}
				<span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
					>🏆 {title}</span
				>
			{:else}
				{title}
			{/if}
		</h3>
		<div
			class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-4 {anchor ===
			'top50'
				? 'pb-8'
				: ''}"
		>
			{#each games as game, index}
				<div
					role="button"
					class="snap-start shrink-0 card {anchor === 'top50'
						? 'w-56'
						: 'w-48'} text-center box relative group hover:scale-105 transition-all duration-300 bg-white overflow-hidden"
					on:click={(e) => {
						selection = game;
						onLoad(e);
					}}
				>
					{#if anchor === 'top50' && game.rank <= 10}
						<div
							class="absolute top-0 left-0 bg-gradient-to-br {game.rank === 1
								? 'from-yellow-400 to-amber-500'
								: game.rank <= 3
								? 'from-gray-300 to-gray-400'
								: game.rank <= 10
								? 'from-orange-300 to-orange-400'
								: ''} text-white font-bold text-lg w-12 h-12 flex items-center justify-center rounded-br-2xl z-10 shadow-lg"
						>
							{game.rank}
						</div>
					{/if}
					<div class={anchor === 'top50' ? 'p-4' : 'py-8 px-2'}>
						<div class="relative {anchor === 'top50' ? 'mb-3' : ''}">
							<img
								class="h-auto max-w-full rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300 {anchor ===
								'top50'
									? 'aspect-square object-cover'
									: ''}"
								src={game.thumbnail}
								alt={game.name}
							/>
						</div>
						<p
							class="{anchor === 'top50'
								? 'font-bold text-base mt-3 line-clamp-2 h-12'
								: 'text-sm mt-2 italic'} text-center"
						>
							{#if anchor !== 'top50' && (game.rank || index + 1)}
								<span class="font-bold">{game.rank ? game.rank : index + 1}.</span>
							{/if}
							{game.name}
						</p>

						{#if game.description}
							<p class="mt-2 text-xs text-gray-600 max-h-20 overflow-auto line-clamp-3">
								{@html game.description
									?.replaceAll('[b]', '<b>')
									?.replaceAll('[/b]', '</b>')
									?.replaceAll('\n', '</br>')}
							</p>
						{/if}

						{#if anchor === 'top50' && game.rank}
							<div class="mt-3 pt-3 border-t border-gray-200">
								<span class="text-xs font-semibold text-indigo-600">BGG Rank #{game.rank}</span>
							</div>
						{/if}
					</div>

					{#if game.progress}
						<div class="ribbon ribbon-top-right"><span>{game.progress}%</span></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
{/if}
