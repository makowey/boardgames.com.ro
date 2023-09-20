<script lang="ts">
    import '../app.postcss';
    import {AppBar, AppShell, getToastStore, initializeStores, storePopup, Toast} from '@skeletonlabs/skeleton';
    import Icon from '@iconify/svelte';

    // Floating UI for Popups
    import {arrow, autoUpdate, computePosition, flip, offset, shift} from '@floating-ui/dom';

    storePopup.set({computePosition, autoUpdate, flip, shift, offset, arrow});
    initializeStores();
    const toastStore = getToastStore();

    const t = {
        message:
            'Portalul este in lucru, in incercarea de a inlocui o solutie mai veche... Pentru intrebari, sugestii folositi puteti folosi #discord(link-ul de sus): @cmakowey',
        autohide: false,
        background: 'variant-filled-warning'
    };
    toastStore.trigger(t);
</script>

<!-- App Shell -->
<AppShell>
    <svelte:fragment slot="header">
        <!-- App Bar -->
        <AppBar>
            <svelte:fragment slot="lead">
                <strong class="text-sm uppercase">🎲 Boardgames 🇷🇴
                    <span class="text-xs align-super">Search Portal</span>
                </strong>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                <a
                        class="btn btn-sm variant-ghost-surface"
                        href="https://discord.gg/cybPRKu2Cb"
                        target="_blank"
                        rel="noreferrer"
                >
                    <Icon icon="line-md:discord-twotone" width="24"/>
                    Discord
                </a>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <!-- Page Route Content -->
    <slot/>
</AppShell>

<Toast position="b" max={3} width="w-full" rounded={'rounded-md'}/>
