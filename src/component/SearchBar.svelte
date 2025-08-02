<script lang="ts">
	import { fly } from 'svelte/transition';
	import { focusTrap } from '@skeletonlabs/skeleton';
	import debounce from 'lodash.debounce';

	export let placeholder = 'enter your search here';
	export let value = '';

	const handleInput = debounce((e) => {
		value = e.target.value;
	}, 600);
</script>

<div class="flex justify-center py-6 px-4" in:fly={{ y: -100, duration: 500, delay: 1000 }}>
	<form name="search" use:focusTrap={true} class="relative w-full max-w-2xl">
		<div
			class="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-xl opacity-50 animate-pulse"
		/>
		<div class="relative">
			<input
				type="search"
				class="w-full p-5 pl-12 pr-5 text-lg font-semibold text-gray-900 border-2 border-surface-300-600-token bg-surface-50-900-token/95 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 focus:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-200-700-token focus:border-primary-400-500-token placeholder-surface-500"
				name="q"
				{placeholder}
				autocomplete="off"
				{value}
				on:input={handleInput}
			/>
			<div class="absolute left-4 top-1/2 -translate-y-1/2 text-surface-500">
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="3"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>
		</div>
	</form>
</div>
