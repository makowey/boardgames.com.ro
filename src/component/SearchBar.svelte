<script lang="ts">
    import {fly} from 'svelte/transition';
    import type {AutocompleteOption, PopupSettings} from '@skeletonlabs/skeleton';
    import {Autocomplete, popup} from '@skeletonlabs/skeleton';

    export let value = '';

    export let placeholder = 'enter your search here';
    let popupSettings: PopupSettings = {
        event: 'focus-click',
        target: 'popupAutocomplete',
        placement: 'bottom',
    };

    const suggestions: AutocompleteOption[] = [
        {
            label: 'Azul',
            value: 'Azul',
            keywords: 'boardgame'
        },
        {
            label: 'Brass',
            value: 'Brass Birmingham',
            keywords: 'boardgame'
        }];

    function onSuggestionSelection(event: CustomEvent<AutocompleteOption>): void {
        value = event.detail.label;
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
        />

        <div data-popup="popupAutocomplete" class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto z-10" tabindex="-1">
            <Autocomplete
                    bind:input={value}
                    options={suggestions}
                    on:selection={onSuggestionSelection}
            />
        </div>
    </form>
</div>
