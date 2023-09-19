<script>
    import SearchGame from "../component/SearchGame.svelte";
    import {dev} from '$app/environment';
    import {inject} from '@vercel/analytics';
    import Retailers from "../component/Retailers.svelte";

    inject({mode: dev ? 'development' : 'production'});
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container h-full mx-auto flex justify-center">
    <div class="space-y-10 text-center flex flex-col items-center">
        <div class="w-11/12 mt-3">
            <SearchGame/>
        </div>

        <div class="w-11/12">
            <Retailers/>
        </div>
    </div>
</div>