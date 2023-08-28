<script lang="ts">
    import {ArrowUpRight, EllipsisVertical, Icon} from "svelte-hero-icons";
    import {pb} from "$lib/pocketbase";
    import {error} from "@sveltejs/kit";
    import {sendToast} from "$lib/utils/toast";
    import {sendConfirmModal} from "$lib/utils/modal";
    import UserAvatar from "$lib/components/UserAvatar.svelte";
    import {onDestroy, onMount} from "svelte";
    import Popup from "$lib/components/Popup.svelte";
    import {familyData} from "$lib/store/family";
    import Spinner from "$lib/components/Spinner.svelte";

    export let data;
    let openPopoverId = null;
    let isLoading = false;
    let previousMembers = [];

    const unsubscribe = familyData.subscribe(currentFamilyData => {
        if (currentFamilyData && currentFamilyData.members) {
            if (JSON.stringify(previousMembers) !== JSON.stringify(currentFamilyData.members)) {
                previousMembers = [...currentFamilyData.members];

                if (typeof window !== 'undefined') {
                    window.location.reload();
                }
            }
        } else {
            previousMembers = [];
        }
    });

    onDestroy(unsubscribe);

    const handleOutsideClick = (e) => {
        if (openPopoverId) {
            openPopoverId = null;
        }
    }

    // Attach the event listener when the component mounts and remove it on destroy
    onMount(() => {
        window.addEventListener('click', handleOutsideClick);
    });

    const deleteFamily = async (familyId: string) => {
        try {
            await pb.collection('families').delete(familyId);
        } catch (e) {
            console.error(e);
            throw error(e.status, e.message);
        }

        sendToast("Family deleted")
        window.location.href = '/dashboard/families'
    }

    const handleQuitFamily = async (userID, familyID, familyMembers) => {
        isLoading = true
        try {
            familyMembers = familyMembers.filter(member => member !== userID);
            await pb.collection('families').update(familyID, {
                "members": familyMembers,
            });
        } catch (e) {
            sendToast(e.message, 'error');
            console.error(e)
        } finally {
            isLoading = false
            if (typeof window !== 'undefined') {
                window.location.reload();
            }
        }
    }

    const triggerQuitFamilyModal = (userID, familyID, familyMembers) => {
        sendConfirmModal('Quit Family', "Are you sure you want to quit this family?", () => handleQuitFamily(userID, familyID, familyMembers))
        openPopoverId = null;
    }

    const triggerDeleteFamilyModal = (familyId: string) => {
        sendConfirmModal('Delete Family', "Are you sure you want to delete this family?", () => deleteFamily(familyId))
        openPopoverId = null;
    }
</script>

<div class="flex items-center justify-between">
    <h2>
        <a href="/dashboard/families">
            <h3 class="h3 font-bold">Families</h3>
        </a>
    </h2>
    {#if data.families.length > 0}
        <a href="/dashboard/families/new" class="btn variant-ghost"> New Family </a>
    {/if}
</div>

{#if isLoading}
    <div class="mx-auto">
        <Spinner/>
    </div>
{/if}

{#if data.families.length === 0}
    <div class="mt-10 p-6 border rounded-md text-center">
        <p class="text-xl font-semibold mb-4">It looks like you have no families.</p>
        <a href="/dashboard/families/new" class="mt-6 btn variant-ghost-primary">Create your first family</a>
    </div>
{/if}

{#each data.families as family}
    <div class="card p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center content-center">
        <!-- Titles -->
        <div class="font-semibold text-primary hidden md:block">Name</div>
        <div class="font-semibold text-primary hidden md:block">Members</div>
        <div class="font-semibold text-primary hidden md:block">Creator</div>
        <div class="font-semibold text-primary hidden md:block"></div>

        <!-- Family Name column -->
        <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-0">
            <div class="font-semibold text-primary md:hidden">Name</div>
            <div>{family.name}</div>
        </div>

        <!-- Members column -->
        <a href={`/dashboard/families/${family.id}/members`}
           class="flex flex-col hover:cursor-pointer md:flex-row items-center space-y-2 md:space-y-0 md:space-x-0">
            <div class="font-semibold text-primary md:hidden">Members</div>
            <div class="flex space-x-2">
                {#if family.expand.members}
                    {#each family.expand.members as member}
                        <UserAvatar
                                collectionId={member?.collectionId}
                                userId={member?.id}
                                avatar={member?.avatar}
                                username={member.username}/>
                    {/each}
                {:else}
                    <p>No members</p>
                {/if}
            </div>
        </a>

        <!-- Creator column -->
        <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-0">
            <div class="font-semibold text-primary md:hidden">Creator</div>
            <UserAvatar
                    collectionId={family.expand.creator?.collectionId}
                    userId={family.expand.creator?.id}
                    avatar={family.expand.creator?.avatar}
                    username={family.expand.creator?.username}/>
        </div>

        <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-0 gap-2 relative">
            <div class="font-semibold text-primary md:hidden md:space-x-2">Actions</div>
            <a href={`/family/${family.slug}`} target="_blank" class="btn variant-ghost-secondary btn-sm w-50 mr-3">
                <span>Page</span>
                <span><Icon src={ArrowUpRight} class="w-4 h-4"/></span>
            </a>
            <button on:click|stopPropagation={() => openPopoverId = family.id}>
                <Icon src={EllipsisVertical} class="w-6 h-6"/>
            </button>
            <Popup top="-20px" right="5px" isOpen={openPopoverId === family.id}
                   closePopover={() => openPopoverId = null}>
                {#if family.creator === data.user.id}
                    <a href={`/dashboard/families/${family.id}/edit`}
                       class="block py-2 px-4 hover:bg-secondary-100 rounded">Edit</a>
                    <div on:click={() => triggerDeleteFamilyModal(family.id, family.expand.creator.id)}
                         class="w-full hover:cursor-pointer block py-2 px-4 text-error-600 rounded">Delete
                    </div>
                {:else}
                    <div on:click={() => triggerQuitFamilyModal(data.user.id, family.id, family.members)}
                         class="w-full hover:cursor-pointer block p-2 text-error-600 rounded">Quit Family
                    </div>
                {/if}
            </Popup>
        </div>
    </div>
{/each}

