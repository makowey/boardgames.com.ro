<script>
	import SearchGame from '../component/SearchGame.svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import Retailers from '../component/Retailers.svelte';
	import Gallery from "../component/Gallery.svelte";
	import {retailers} from "$lib/retailers";

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="h-full flex flex-col">
	<SearchGame />
	<Gallery anchor="retailers" title="Retailers" games={retailers.map(r => {
		return {
			name: ' ',
			url: r.site,
			image: r.logo,
			thumbnail: r.logo,
			rank: ' ',

		}
	})}/>
<!--	<Retailers />-->
</div>
