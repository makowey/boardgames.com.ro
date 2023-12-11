<script>
    import {retailers} from '$lib/retailers';
</script>

<footer class="mt-auto p-6 flex justify-center items-center gap-10 flex-wrap">
    {#each retailers as retailer}
        {#if !retailer.maintainance}
            <a href={retailer.site} target="_blank">
                <img src={retailer.logo} alt={retailer.name} class="w-24"/>
            </a>
        {/if}
    {/each}
</footer>
