<script lang="ts">
    import '../app.postcss';
    import {AppBar, AppShell, getToastStore, initializeStores, storePopup, Toast} from '@skeletonlabs/skeleton';

    // Floating UI for Popups
    import {arrow, autoUpdate, computePosition, flip, offset, shift} from '@floating-ui/dom';

    storePopup.set({computePosition, autoUpdate, flip, shift, offset, arrow});
    initializeStores();
    const toastStore = getToastStore();

    const t = {
        message: 'Portalul este in lucru, in incercarea de a inlocui o solutie mai veche...',
        autohide: false
    };
    toastStore.trigger(t);
</script>

<!-- App Shell -->
<AppShell>
    <svelte:fragment slot="header">
        <!-- App Bar -->
        <AppBar>
            <svelte:fragment slot="lead">
                <strong class="text-xl uppercase">Boadgames.com.ro</strong>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                <a
                        class="btn btn-sm variant-ghost-surface"
                        href="https://discord.gg/cybPRKu2Cb"
                        target="_blank"
                        rel="noreferrer"
                >
                    Discord
                </a>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <!-- Page Route Content -->
    <slot/>
</AppShell>

<div class="z-50">
    <Toast position="b" max={3} width="w-full" rounded={'rounded-md'}/>
</div>
