<script lang="ts">
	import SearchBar from './SearchBar.svelte';
	import Games from './Games.svelte';
	import { browser } from '$app/environment';
	import type { Game, Kickstarter } from '$lib/types';
	import GameCardPresentation from './GameCardPresentation.svelte';
	import { onMount } from 'svelte';
	import Gallery from './Gallery.svelte';
	import { GEEK_MARKET, retailers } from '$lib/retailers';
	import Icon from '@iconify/svelte';
	import { getModalStore, Modal, type ModalSettings } from '@skeletonlabs/skeleton';
	import { deduplicateGames } from '$lib/utils';
	import { playableGames } from '$lib/biblionar';

	export let findGame = '';
	let hTP: boolean = false;
	let games: Game[] = [];
	$: if (findGame?.length === 0) {
		games = [];
	}

	const numberOfMinimCharsForSearch = 3;

	let hotGames: Game[] = [];
	let mostPlayedGames: Game[] = [];
	let mostPlayedGamesTitle: string = 'BGG MostPlayed';
	let mostBuyedGamesTitle: string = 'BGG Most Buyed';
	let topGames: Game[] = [];
	let newGames: Game[] = [];
	let kickstarters: Game[] = [];
	let ownership: Game[] = [];
	let hotSelection: Game;
	let loading: boolean = false;
	let howToPlay: boolean = true;
	let shiparea = 'ro';
	let selectedGame: Game;
	let selectedGameId: number;

	onMount(() => {
		loadMostPLayedGames();
		loadOwnerships();
		loadHotGames();
		loadKickstarters();
		loadTopGames();
		loadNewGames();
	});

	function loadGame(e) {
		loading = true;

		selectedGame = e.detail.payload.game;
		selectedGameId = selectedGame.id;
		fetch('/api/bgg/game/' + selectedGameId)
			.then((r) => r.json())
			.then((r) => {
				loading = false;
				openTheModal({ ...r.data, url: selectedGame.url });
			});
	}

	function loadHotGames() {
		fetch('/api/bgg/hot')
			.then((r) => r.json())
			.then((r) => {
				hotGames = r.data;
			});
	}

	function loadMostPLayedGames() {
		fetch('/api/bgg/mostplayed')
			.then((r) => r.json())
			.then((r) => {
				mostPlayedGames = r.data;
				mostPlayedGamesTitle = r.title;
			});
	}

	function loadOwnerships() {
		fetch('/api/bgg/trends')
			.then((r) => r.json())
			.then((r) => {
				ownership = r.data;
				mostBuyedGamesTitle = r.title;
			});
	}

	function loadTopGames() {
		fetch('/api/bgg/local?size=50')
			.then((r) => r.json())
			.then((r) => {
				topGames = r.data.map((bggGame) => {
					return {
						id: bggGame.ID,
						name: bggGame.Name,
						image: bggGame.Thumbnail,
						thumbnail: bggGame.Thumbnail,
						url: bggGame.URL,
						rank: bggGame.Rank
					};
				});
			});
	}

	function loadNewGames() {
		fetch('/api/bgg/newreleases')
			.then((r) => r.json())
			.then((r) => {
				newGames = deduplicateGames(
					[
						r.data.map((i) => {
							return {
								name: i.itemName,
								id: i.item.id,
								thumbnail: i.image.src,
								url: i.item.href
							};
						})
					],
					'name'
				)?.[0];
			});
	}

	function loadKickstarters() {
		fetch('/api/bgg/kickstarters')
			.then((r) => r.json())
			.then((r) => {
				kickstarters = r.data.map((k: Kickstarter) => {
					return {
						id: k.item?.id,
						name: k.name,
						thumbnail: k.item.imageSets?.mediacard?.src,
						url: k.orderUrl,
						price: 0,
						retailer: { name: 'Kickstarter' },
						progress: k.progress
					};
				});
			});
	}

	$: if (browser && window.location.search) {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		findGame = urlParams.get('q') || '';
	}

	const modalStore = getModalStore();
	const openTheModal = (game) => {
		console.log(`Loading: ${game.name}, GAME-ID: ${game.id}`);

		const modal: ModalSettings = {
			type: 'component',
			spacing: 'space-y-16',
			zIndex: 'z-999',
			component: {
				ref: GameCardPresentation,
				props: {
					game: game,
					hTP: hTP,
					loading: loading
				}
			}
		};

		modalStore.trigger(modal);
	};
</script>

<div class="inline-block">
	<div class="bg-surface-50-900-token/95 backdrop-blur-sm border border-surface-200-700-token/50 rounded-2xl shadow-xl p-6 mb-8">
		<SearchBar placeholder="Caută board game(joc)..." bind:value={findGame} />
		<div class="items-center flex justify-center gap-2 mt-4">
			<div
				class="flex items-center gap-2 bg-surface-100-800-token/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
			>
				<img src={GEEK_MARKET.logo} alt="GeekMarget" class="h-10" />
				<span class="text-sm font-bold text-surface-700-200-token">Ship to:</span>
			</div>

			<div class="flex gap-1 bg-surface-100-800-token/80 backdrop-blur-sm rounded-full p-1 shadow-lg">
				{#each ['ro', 'europe', 'eu'] as c}
					<button
						class="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 {shiparea ===
						c
							? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md scale-105'
							: 'bg-transparent hover:bg-surface-200-700-token'}"
						on:click={() => (shiparea = c)}
						on:keypress
					>
						<span class="w-6 h-6"><Icon icon="flag:{c}-4x3" /></span>
						<span class="uppercase font-bold text-sm">{c}</span>
					</button>
				{/each}
			</div>
		</div>
	</div>

	<div class="mt-7">
		{#if findGame?.length >= numberOfMinimCharsForSearch}
			<div class="mx-auto max-w-4xl">
				{#if games.length > 0}
					<p class="italic mb-3 text-right text-xs lg:text-md">
						{games.length} sugestii pentru [{findGame.toUpperCase()}] de la
						<span class="accent-error-200 font-bold text-cyan-600">{retailers.length}</span> magazine.
					</p>
				{/if}

				<Games
					searchText={findGame}
					bind:games
					{numberOfMinimCharsForSearch}
					{howToPlay}
					{shiparea}
				/>
			</div>
		{:else}
			<Gallery
				anchor="play"
				title="Playable Games"
				games={playableGames}
				bind:selection={hotSelection}
				on:onLoad={loadGame}
			/>
			<Gallery
				anchor="news"
				title="New Releases"
				games={newGames}
				bind:selection={hotSelection}
				on:onLoad={loadGame}
			/>
			<Gallery
				anchor="hot"
				title="BGG Hotlist"
				games={hotGames}
				bind:selection={hotSelection}
				on:onLoad={loadGame}
			/>
			<Gallery
				anchor="mostPlayed"
				title={mostPlayedGamesTitle}
				games={mostPlayedGames}
				bind:selection={hotSelection}
				on:onLoad={loadGame}
			/>
			<Gallery
				anchor="kickstarters"
				title="Kickstarters"
				games={kickstarters}
				bind:selection={hotSelection}
				on:onLoad={loadGame}
			/>
			<Gallery
				anchor="trends"
				title={mostBuyedGamesTitle}
				games={ownership}
				bind:selection={hotSelection}
				on:onLoad={loadGame}
			/>
			<Gallery
				anchor="top50"
				title="BGG Top 50"
				games={topGames}
				bind:selection={hotSelection}
				on:onLoad={loadGame}
			/>
		{/if}
	</div>
</div>

<Modal />
