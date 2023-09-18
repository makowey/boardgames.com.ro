<script>
    import SearchGame from "../component/SearchGame.svelte";
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    import Retailers from "../component/Retailers.svelte";

    inject({ mode: dev ? 'development' : 'production' });
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container h-full mx-auto flex justify-center">
    <div class="space-y-10 text-center flex flex-col items-center">
        <h2 class="h2">Boardgames Romanian Search Portal</h2>

        <Retailers/>

        <div class="w-full">
            <SearchGame/>
        </div>
    </div>
</div>