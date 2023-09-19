<script>
	import debounce from 'lodash.debounce';
	import { fly } from 'svelte/transition';

	export let value = '';

	const handleInput = debounce((e) => {
		value = e.target.value;
	}, 500);

	export let placeholder = 'enter your search here';
</script>

<div class="flex justify-center py-6" in:fly={{ y: -100, duration: 500, delay: 1000 }}>
	<form name="search">
		<input
			class="p-4 border-2 border-solid border-yellow-400 bg-transparent rounded-[30px] min-w-[300px] hover:rounded-lg transition-all duration-200 focus:outline-none"
			name="q"
			{placeholder}
			onmouseout="this.value = ''; this.blur();"
			on:input={handleInput}
			autocomplete="off"
		/>
	</form>
</div>
