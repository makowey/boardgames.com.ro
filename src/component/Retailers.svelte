<script>
    export let retailers = [{
        name: "Pionul.ro",
        logo: "https://pionul.ro/image/cache/data/Daniel/logo-final-200x56.jpg",
        site: "https://pionul.ro"
    }];
</script>

{#each retailers as retailer}
    <a href="{retailer.site}" target="_blank" class="card-hover absolute">
        <img src="{retailer.logo}" width="130" height="30" alt="{retailer.name}">
    </a>
{/each}