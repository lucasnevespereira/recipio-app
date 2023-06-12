<script lang="ts">
    import {Avatar} from "@skeletonlabs/skeleton";
    import {getImageURL} from "$lib/utils/image";
    import {goto} from "$app/navigation";

    export let data;

    function triggerDeleteFamilyModal() {
    }
</script>

<div class="flex items-center justify-between">
    <h2>
        <a href="/dashboard/families">
            <h3 class="h3 font-bold">Families</h3>
        </a>
    </h2>
    <a href="/dashboard/families/new" class="btn variant-ghost"> Create Family </a>
</div>

{#each data.families as family}
    <div class="card p-4 flex justify-between items-center">
        <div>
            <h3>{family.name}</h3>
        </div>
        <div>
            <a href={`/dashboard/families/${family.id}/edit`} class="btn variant-ghost-secondary"> Edit </a>
            {#if family.creator === data.user.id}
                <button on:click={triggerDeleteFamilyModal} class="btn variant-ghost-error"> Delete</button>
            {/if}
        </div>
    </div>
{/each}