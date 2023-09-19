<script>
    import {retailers} from "./retailers";
</script>

<div class="grid grid-cols-6 space-x-2">
    {#each retailers as retailer}
        <a href="{retailer.site}" target="_blank" class="card-hover">
            <img src="{retailer.logo}" width="130" height="30" alt="{retailer.name}">
        </a>
    {/each}
</div>