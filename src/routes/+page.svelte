<script>
	import SearchGame from '../component/SearchGame.svelte';
	import {dev} from '$app/environment';
	import {inject} from '@vercel/analytics';
	import Retailers from '../component/Retailers.svelte';
	import Gallery from "../component/Gallery.svelte";
	import {retailers} from "$lib/retailers";
	import {isMobile} from "$lib/stores";

	inject({mode: dev ? 'development' : 'production'});
</script>

<div class="h-full flex flex-col">
    <SearchGame/>

    {#if $isMobile}
        <Gallery anchor="retailers" title="APIs" games={retailers.map(r => {
		return {
			name: ' ',
			url: r.site,
			image: r.logo,
			thumbnail: r.logo,
			rank: ' ',
		}
	})}/>
    {:else }
        <Retailers/>
    {/if}

</div>
