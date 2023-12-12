<script lang="ts">
    import {fly} from 'svelte/transition';
    import {focusTrap} from '@skeletonlabs/skeleton';
    import debounce from 'lodash.debounce'

    export let placeholder = 'enter your search here';
    export let value = '';

    const handleInput = debounce(e => {
        value = e.target.value;
    }, 600);
</script>

<div class="flex justify-center py-2" in:fly={{ y: -100, duration: 500, delay: 1000 }}>
    <form name="search" use:focusTrap={true}>
        <input
                type="search"
                class="p-4 border-2 border-solid border-yellow-400 bg-transparent rounded-[30px] min-w-[300px] hover:rounded-lg transition-all duration-200 focus:outline-none input autocomplete"
                name="q"
                {placeholder}
                autocomplete="off"
                {value}
                on:input={handleInput}
        />
    </form>
</div>