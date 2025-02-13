<script lang="ts">
	import type { Game, HowToPlay } from '$lib/types';
	import { Ratings, Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import { stripHtml } from '$lib/utils.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { HOW_TO_PLAY } from '$lib/retailers';
	import LottieAnimation from './player/LottieAnimation.svelte';
	import Youtube from 'svelte-youtube-embed';

	export let game: Game;
	export let loading: boolean = true;
	let youtubeId: string;
	let sourceData = [];
	let howtoplay: HowToPlay[] = [];
	export let hTP = false;
	export let parent;

	onMount(() => {
		fetch('/api/howtoplay')
			.then(r => r.json())
			.then(r => {
				howtoplay = r.games;
			});
	});
	let tableSimple: any;
	let rating = 0;
	let rank = 0;
	$: if (game?.videos?.total > 0) {
		const urls = game.videos.items?.filter(v => v.language === 'English');
		youtubeId = urls[Math.ceil(Math.random() * urls?.length)]?.link?.split('watch?v=')?.[1];
	}

	$: if (hTP && howtoplay?.length > 0 && game?.name) {
		const howToPlaySuggestions = howtoplay.filter(g => g.name.indexOf(game?.name) > -1).filter(g => g.channel_id != 6);
		if (howToPlaySuggestions?.length > 0) {
			youtubeId = howToPlaySuggestions[Math.floor(Math.random() * howToPlaySuggestions.length)].video_id;
		}
	}

	$: if (game?.marketplacelistings?.length > 0) {
		let counter = 0;
		sourceData =
			game?.marketplacelistings
				.filter(list => list.price.currency === 'EUR')
				.map(list => {
					return {
						position: ++counter,
						name: list.notes?.length > 0 ? stripHtml(list.notes).substring(0, 100).concat('...') : 'No notes...',
						condition: list.condition,
						price: (list.price.value * 4.9677).toFixed(2),
						url: list.link.href
					};
				});

		rating = game?.statistics?.ratings?.average;
		rank = game?.statistics?.ratings?.ranks[0].value;

		tableSimple = {
			// A list of heading labels.
			head: ['Pozitie', 'Descriere', 'Stare', 'RON'],
			// The data visibly shown in your table body UI.
			body: tableMapperValues(sourceData, ['position', 'name', 'condition', 'price']),
			// Optional: The data returned when interactive is enabled and a row is clicked.
			meta: tableMapperValues(sourceData, ['position', 'name', 'price', 'currency', 'url']),
			foot: ['Media', '', '', `<code class="code">${sourceData?.length ? (sourceData.map(l => l.price).reduce((a, b) => parseInt(a) + parseInt(b)) / sourceData?.length).toFixed(2) : '?'} RON</code>`]
		};
	}
</script>

{#if loading}
	<LottieAnimation path="handLoading" />

{:else if game?.name}
	<div class="card card-hover flex flex-col sm:flex-row shadow-2xl overflow-hidden rounded-lg m-10">
		<div class="relative aspect-video overflow-hidden sm:aspect-square sm:max-w-[270px] bg-white">
			<a href="{game.url ?? '/'}" target="_blank">
				<img
					class="object-contain sm:object-cover w-full h-full"
					src={game.image}
					alt="Game thumbnail"
				/>
			</a>
		</div>
		<div class="card-body p-6 flex flex-col gap-3 flex-1">
			<h2 class="card-title text-left font-bold text-2xl">
				<a href="https://boardgamegeek.com/boardgame/{game.id}" target="_blank">
					{@html game.name}
				</a>
			</h2>
			<div class="badge bg-violet-400 rounded-full max-w-max text-black">{game.yearpublished}</div>
			<div>Players: {game.minplayers} - {game.maxplayers}, Playing time: {game.playingtime} min. (Rank: {rank}
				- {rating})
			</div>
			<div class="text-md">
				<Ratings bind:value={rating} max={10}>
					<svelte:fragment slot="empty">
						<Icon icon="tabler:meeple" />
					</svelte:fragment>
					<svelte:fragment slot="half">
						<Icon icon="game-icons:abbot-meeple" />
					</svelte:fragment>
					<svelte:fragment slot="full">
						<Icon icon="game-icons:meeple" />
					</svelte:fragment>
				</Ratings>
			</div>
			<div class="flex justify-end mt-auto w-full flex-wrap">
				<p class="text-3xl italic">
				</p>
			</div>

			{#if game.url.indexOf('biblionar') > -1}
				<a href="{game.url}" class="card p-2 font-semibold mx-auto text-2xl text-center" target="_blank">Play NOW</a>
			{/if}

			<!--            <SlideToggle name="how-to-play" bind:checked={hTP} active="bg-primary-500" size="sm" label="How to play?"/>-->
			{#if hTP}
				<a href="https://www.howtoplay.ro/oferte-boardgames/{game.name}" target="_blank" class="place-self-end">
					<img src="{HOW_TO_PLAY.logo}" alt="How to play {game?.name}?" width="150" />
				</a>
			{/if}

			{#if youtubeId}
				<div class="w-3/4 place-self-center">
					<Youtube id="{youtubeId}" />
				</div>
			{/if}
		</div>
	</div>

	{#if tableSimple}
		<div class="card m-10 w-3/4 place-self-center hidden">
			<h4 class="h4 card-header p-2 text-lime-600">Geek market list(EURopa):</h4>
			<Table source={tableSimple} interactive={true}
						 on:selected={(e) => goto(e.detail[4], {replaceState: false})} />
		</div>
	{/if}
{/if}