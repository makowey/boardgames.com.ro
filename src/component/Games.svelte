<script lang="ts">
	import LottieAnimation from './player/LottieAnimation.svelte';
	import GameCard from './GameCard.svelte';
	import type { Game } from '$lib/types';

	export let games: Game[];
	export let searchText = 'boardgame';
	let isNavigating = false;

	async function searchForGame() {
		isNavigating = true;
		const response = await fetch('/api/search?search=' + searchText);
		const data = await response.json();
		games = [...data.games];
		isNavigating = false;
		// console.log(`Found ${games.length} games...`, games);
	}

	$: if (searchText?.length > 3) {
		searchForGame();
	}
</script>

{#if isNavigating}
	<LottieAnimation path="loading" />
{:else if games?.length > 0}
	<ul class="grid lg:grid-cols-2 gap-8">
		{#each games as game}
			<GameCard {game} />
		{/each}
	</ul>
{:else if searchText}
	<LottieAnimation />
{/if}
