<script lang='ts'>
    import {
        AppShell,
        Drawer,
        Modal,
        Toast
    } from '@skeletonlabs/skeleton';
    import Navigation from '$lib/components/Navigation.svelte';
</script>


<Toast/>
<Modal/>
<Drawer>
    <Navigation/>
</Drawer>

<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10">
    <svelte:fragment slot="sidebarLeft">
        <Navigation/>
    </svelte:fragment>

    <div class="container p-10 mx-auto">
        <slot/>
    </div>
</AppShell>
