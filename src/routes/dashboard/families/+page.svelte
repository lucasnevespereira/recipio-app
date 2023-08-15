<script lang="ts">
    import {getImageURL} from "$lib/utils/image";
    import {Avatar} from "@skeletonlabs/skeleton";
    import {ArrowUpRight, Icon} from "svelte-hero-icons";
    import {pb} from "$lib/pocketbase";
    import {error} from "@sveltejs/kit";
    import {sendToast} from "$lib/utils/toast";
    import {sendConfirmModal} from "$lib/utils/modal";

    export let data;

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

    const triggerDeleteFamilyModal = (familyId: string) => {
        sendConfirmModal('Delete Family', "Are you sure you want to delete this family?", () => deleteFamily(familyId))
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

{#if data.families.length === 0}
    <div class="mt-10 p-6 border rounded-md text-center">
        <p class="text-xl font-semibold mb-4">It looks like you have no families.</p>
        <a href="/dashboard/families/new" class="mt-6 btn variant-ghost-primary">Create your first family</a>
    </div>
{/if}

{#each data.families as family}
    <div class="card p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <!-- Titles -->
        <div class="font-semibold text-primary hidden md:block">Name</div>
        <div class="font-semibold text-primary hidden md:block">Members</div>
        <div class="font-semibold text-primary hidden md:block">Creator</div>
        <div class="font-semibold text-primary hidden md:block">Actions</div>

        <!-- Family Name column -->
        <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
            <div class="font-semibold text-primary md:hidden">Name</div>
            <div>{family.name}</div>
        </div>

        <!-- Members column -->
        <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
            <div class="font-semibold text-primary md:hidden">Members</div>
            <div class="flex space-x-2">
                {#if family.expand.members}
                    {#each family.expand.members as member}
                        <img src={member.avatar} alt={member.name} class="rounded-full h-6 w-6"/>
                    {/each}
                {:else}
                    <p>No members</p>
                {/if}
            </div>
        </div>

        <!-- Creator column -->
        <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
            <div class="font-semibold text-primary md:hidden">Creator</div>
            <Avatar src={getImageURL(family.expand.creator?.collectionId, family.expand.creator?.id, family.expand.creator?.avatar)}
                    initials={family.expand.creator?.username} width="w-10" background="bg-primary-500"/>
        </div>

        <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
            <div class="font-semibold text-primary md:hidden">Actions</div>
            {#if family.creator === data.user.id}
                <a href={`/dashboard/families/${family.id}/edit`} class="btn variant-ghost-secondary btn-sm w-50 ml-3">Edit</a>
                <button on:click={() => triggerDeleteFamilyModal(family.id, family.expand.creator.id)} class="btn variant-ghost-error btn-sm w-50 ml-3">Delete</button>
            {/if}
            <a href={`/family/${family.slug}`} target="_blank" class="btn variant-ghost-secondary btn-sm w-50 ml-3">
                <span>Page</span>
                <span><Icon src={ArrowUpRight} class="w-4 h-4"/></span>
            </a>
        </div>
    </div>
{/each}
