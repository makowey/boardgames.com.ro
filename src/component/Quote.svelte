<script>
	import { onMount } from 'svelte';
	import { quotes } from '$lib/quotes';

	let quote = 'Qvo Vadis?';
	onMount(() => {
		quote = quotes[Math.floor(Math.random() * quotes.length)];
	});
</script>

<p class="blockquote text-xl text-warning-400-800-token mt-10">
	{quote?.text || 'Life is too short to not enjoy a game...'} - {quote?.author || '#me'}
</p>
