<script lang='ts'>
    // // The ordering of these imports is critical to your app working properly
    import '@skeletonlabs/skeleton/themes/theme-modern.css';
    // If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    // Most of your app wide CSS should be put in this file
    import '../app.postcss';
    import {page} from '$app/stores'
    import {
        AppBar,
        AppShell,
        drawerStore,
        popup,
    } from '@skeletonlabs/skeleton';
    import type {PopupSettings} from '@skeletonlabs/skeleton';
    import {computePosition, autoUpdate, offset, shift, flip, arrow} from '@floating-ui/dom';
    import {storePopup} from '@skeletonlabs/skeleton';
    import {pb} from "$lib/pocketbase";
    import {applyAction, enhance} from '$app/forms';
    import UserAvatar from "$lib/components/UserAvatar.svelte";

    storePopup.set({computePosition, autoUpdate, offset, shift, flip, arrow});

    const {params} = $page;
    const hasUsername = "username" in params;
    const hasFamilySlug = "familySlug" in params;

    const {url} = $page;
    $: isDashboard = $page.url.href.includes('dashboard');
    export let data

    const userMenuPopup: PopupSettings = {
        event: 'click',
        target: 'userMenuList',
        placement: 'bottom-start',
        closeQuery: '.listbox-item'
    };

    function drawerOpen(): void {
        drawerStore.open();
    }
</script>

{#if hasUsername}
    <AppShell>
        <slot/>
    </AppShell>

{:else if hasFamilySlug}
    <AppShell>
        <slot/>
    </AppShell>
{:else}
    <AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10">
        <svelte:fragment slot="header">
            <AppBar background={isDashboard ? "bg-surface-200" : "bg-surface-200-opacity-50"}
                    regionRowMain={!isDashboard && "absolute w-full px-4 md:px-10 py-4 bg-surface-filter-500 shadow-sm"}
                    padding={!isDashboard ? "p-0" : "p-4"}>
                <svelte:fragment slot="lead">
                    {#if isDashboard}
                        <div class="burger-menu">
                            <button class="btn btn-sm mr-4" on:click={drawerOpen}>
                    <span>
						<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
							<rect width="100" height="20"/>
							<rect y="30" width="100" height="20"/>
							<rect y="60" width="100" height="20"/>
						</svg>
					</span>
                            </button>
                        </div>
                    {/if}
                    <a href="/"><strong class="text-xl uppercase flex items-center">
                        <img width="32" src="/logo-transparent.png" alt="logo">
                        Recipio
                    </strong></a>
                </svelte:fragment>
                <svelte:fragment slot="trail">
                    {#if data.user}
                        <div class="relative">
                            <button use:popup={userMenuPopup}>
                                <UserAvatar
                                        collectionId={data.user?.collectionId}
                                        userId={data.user?.id}
                                        avatar={data.user?.avatar}
                                        username={data.user.username}/>
                            </button>
                            <div class="card w-48 shadow-xl py-2" data-popup="userMenuList">
                                <div class="list-nav">
                                    <div>
                                        <a href="/dashboard">Dashboard</a>
                                    </div>
                                    <div>
                                        <a href="/dashboard/recipes">Recipes</a>
                                    </div>
                                    <div>
                                        <a href="/dashboard/families">Families</a>
                                    </div>
                                    <div>
                                        <a href="/dashboard/profile">Profile</a>
                                    </div>
                                    <div>
                                        <a href="/dashboard/settings">Settings</a>
                                    </div>
                                    <div>
                                        <form
                                                method="POST"
                                                action="/auth/logout"
                                                use:enhance={() => {
                                           return async ({ result }) => {
                                          pb.authStore.clear()
                                          await applyAction(result)
                                        }
                                        }}>
                                            <button>Logout</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {:else }
                        <div class="flex">
                            <a href="/auth/login" class="btn variant-filled mr-2">Login</a>
                            <!-- <a href="/auth/signup" class="btn variant-filled mr-2">Signup</a>-->
                        </div>
                    {/if}
                </svelte:fragment>
            </AppBar>
        </svelte:fragment>
        <slot/>
    </AppShell>
{/if}


<style>
    @media screen and (min-width: 1024px) {
        .burger-menu {
            display: none;
        }
    }

</style>




