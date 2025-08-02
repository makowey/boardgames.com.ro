<script lang="ts">
	import '../app.postcss';
	import {
		AppBar,
		AppShell,
		getToastStore,
		initializeStores,
		SlideToggle,
		storePopup,
		Toast
	} from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	// Floating UI for Popups
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();
	const toastStore = getToastStore();

	const t = {
		message:
			'Portalul este in lucru, in incercarea de a inlocui o solutie mai veche... Pentru intrebari, sugestii folositi puteti folosi #discord(link-ul de sus): @cmakowey',
		timeout: 3000,
		background: 'variant-filled-warning'
	};
	// toastStore.trigger(t);

	import { isMobile } from '$lib/stores';

	let innerWidth = 0;
	let innerHeight = 0;

	$: isMobile.set(innerWidth <= 673), console.log('isMobile: ', $isMobile);
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/" class="text-sm uppercase"
					>🎲 Boardgames 🇷🇴
					<span class="text-xs align-super">Search Portal</span>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://discord.gg/cybPRKu2Cb"
					target="_blank"
					rel="noreferrer"
				>
					<Icon icon="line-md:discord-twotone" width="24" />
					Discord
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />

	<svelte:fragment slot="pageFooter">
		<div class="">
			<p class="text-xs text-left text-cyan-900 ml-2">
				Inner Width: {innerWidth}, Inner Height: {innerHeight}, mobile: {$isMobile}
			</p>
		</div>
	</svelte:fragment>
</AppShell>

<Toast position="b" max={3} width="w-full" rounded={'rounded-md'} />
