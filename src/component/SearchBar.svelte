<script lang="ts">
    import {fly} from 'svelte/transition';
    import type {AutocompleteOption, PopupSettings} from '@skeletonlabs/skeleton';
    import {popup} from '@skeletonlabs/skeleton';

    export let value = '';
    export let gameId;

    export let placeholder = 'enter your search here';
    let popupSettings: PopupSettings = {
        event: 'focus-click',
        target: 'popupAutocomplete',
        placement: 'bottom',
    };

    let suggestions: AutocompleteOption[] = [];

    function fetchSuggestions() {
        fetch('/api/bgg/search?q=' + value.replace('$', ''))
            .then(r => r.json())
            .then(r => {
                if (r?.data?.items) {
                    suggestions = [...r.data.items.map(item => {
                        return {
                            label: item.name,
                            value: item.id
                        }
                    })];

                    console.log(`Bgg suggestions: ${suggestions.length}`);
                }
            })
    }
</script>

<div class="flex justify-center py-6" in:fly={{ y: -100, duration: 500, delay: 1000 }}>
    <form name="search">
        <input
                type="search"
                class="p-4 border-2 border-solid border-yellow-400 bg-transparent rounded-[30px] min-w-[300px] hover:rounded-lg transition-all duration-200 focus:outline-none input autocomplete"
                name="q"
                {placeholder}
                autocomplete="off"
                bind:value
                use:popup={popupSettings}
                on:input={fetchSuggestions}
        />

    </form>
</div>
