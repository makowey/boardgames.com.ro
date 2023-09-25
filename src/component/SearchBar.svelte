<script lang="ts">
    import {fly} from 'svelte/transition';
    import type {PopupSettings} from '@skeletonlabs/skeleton';
    import {popup} from '@skeletonlabs/skeleton';
    import debounce from 'lodash.debounce'

    export let placeholder = 'enter your search here';
    export let value = '';

    const handleInput = debounce(e => {
        value = e.target.value;
    }, 600);

    let popupSettings: PopupSettings = {
        event: 'focus-click',
        target: 'popupAutocomplete',
        placement: 'bottom',
    };
</script>

<div class="flex justify-center py-6" in:fly={{ y: -100, duration: 500, delay: 1000 }}>
    <form name="search">
        <input
                type="search"
                class="p-4 border-2 border-solid border-yellow-400 bg-transparent rounded-[30px] min-w-[300px] hover:rounded-lg transition-all duration-200 focus:outline-none input autocomplete"
                name="q"
                {placeholder}
                autocomplete="off"
                {value}
                use:popup={popupSettings}
                on:input={handleInput}
        />
    </form>
</div>
