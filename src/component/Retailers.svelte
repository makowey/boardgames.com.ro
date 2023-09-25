<script>
	import { retailers } from '$lib/retailers';
</script>

<footer class="mt-auto p-6 flex justify-center items-center gap-10">
	{#each retailers as retailer}
		<a href={retailer.site} target="_blank">
			<img src={retailer.logo} alt={retailer.name} class="w-32" />
		</a>
	{/each}
</footer>
