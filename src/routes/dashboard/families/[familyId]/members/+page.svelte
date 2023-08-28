<script>
    import {ArrowLeft, Icon} from "svelte-hero-icons";
    import SearchMembers from "$lib/components/SearchMembers.svelte";
    import FamilyMembers from "$lib/components/FamilyMembers.svelte";
    import SelectedUsers from "$lib/components/SelectedUsers.svelte";
    import {familyData} from "$lib/store/family";

    export let data;
    familyData.set(data.family);

    let selectedUsers = [];
    const isCreator = data.user.id === data.family.creator
</script>

<div class="p-4 sm:p-6">

    <div class="flex items-center justify-between mb-6">
        <h4 class="flex items-center text-lg font-semibold">
            <Icon src={ArrowLeft} class="w-4 h-4 mr-2"/>
            <a href={`/dashboard/families`} class="hover:underline">Back to families</a>
        </h4>
    </div>

    <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-6">
        <FamilyMembers isCreator={isCreator}/>
    </div>
    {#if isCreator}
        <div class="space-y-4">
            <SearchMembers bind:selectedMembers={selectedUsers}/>
            <!-- Selected Users to Invite Section -->
            <SelectedUsers bind:users={selectedUsers}/>
        </div>
    {/if}
</div>
