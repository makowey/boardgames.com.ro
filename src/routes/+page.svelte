<script>
	import SearchGame from '../component/SearchGame.svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import Retailers from '../component/Retailers.svelte';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="h-full flex flex-col">
	<SearchGame />
	<Retailers />
</div>
