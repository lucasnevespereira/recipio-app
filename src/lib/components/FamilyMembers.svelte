<script>
    import {familyData} from "$lib/store/family";
    import UserAvatar from "$lib/components/UserAvatar.svelte";
    import {EllipsisVertical, Icon} from "svelte-hero-icons";
    import Popup from "$lib/components/Popup.svelte";
    import {pb, sendInvite} from "$lib/pocketbase";
    import {sendToast} from "$lib/utils/toast";

    export let isCreator;
    let activePopoverId = null;
    let isLoading = false;

    function handleClosePopover() {
        activePopoverId = null;
    }

    async function removePendingMember(memberID) {
        isLoading = true
        try {
            $familyData.pending_members = $familyData.pending_members.filter(member => member !== memberID);
            const familyResult = await pb.collection('families').update($familyData.id, {"pending_members": $familyData.pending_members}, {expand: 'pending_members'});
            const updatedFamily = structuredClone(familyResult)
            $familyData.expand.pending_members = updatedFamily.expand.pending_members
            sendToast('Member removed from pending list')
        } catch (e) {
            sendToast(e.message, 'error');
            console.error(e)
        } finally {
            isLoading = false
        }
    }

    async function resendInvite(member) {
        isLoading = true;
        try {
            const inviteData = {
                userID: member.id,
                username: member.username,
                email: member.email,
                token: $familyData.invite_token,
                slug: $familyData.slug
            };

            await sendInvite(inviteData);
            sendToast('Invite sent');
        } catch (e) {
            console.error(e)
            sendToast(e.message, 'error');
        } finally {
            isLoading = false;
        }
    }

    async function removeMember(memberID) {
        isLoading = true
        try {
            $familyData.members = $familyData.members.filter(member => member !== memberID);
            const familyResult = await pb.collection('families').update($familyData.id, {"members": $familyData.members}, {expand: 'members'});
            const updatedFamily = structuredClone(familyResult)
            $familyData.expand.members = updatedFamily.expand.members
            sendToast('Member removed')
        } catch (e) {
            sendToast(e.message, 'error');
            console.error(e)
        } finally {
            isLoading = false
        }
    }
</script>

{#if $familyData?.members && $familyData?.members?.length > 0}
    <div class="bg-primary rounded-lg mb-6 w-full text-token card p-4 space-y-4">
        <h5 class="text-xl font-bold mb-4">Members</h5>
        <ul class="space-y-2">
            {#each $familyData.expand.members as member}
                <li class="list flex items-center justify-between">
                    <div class="flex items-center">
                        <UserAvatar
                                collectionId={member?.collectionId}
                                userId={member?.id}
                                avatar={member?.avatar}
                                username={member.username}/>
                        <span class="ml-4">{member.username}</span>
                    </div>
                    {#if isCreator}
                        <div class="relative">
                            <button on:click|stopPropagation={() => activePopoverId = member.id}>
                                <Icon src={EllipsisVertical} class="w-6 h-6"/>
                            </button>
                            <Popup isOpen={activePopoverId === member.id}
                                   bind:loading={isLoading}
                                   handleClose={handleClosePopover}>
                                <div on:click={() => removeMember(member.id)}
                                     class="w-full hover:cursor-pointer block p-2 text-error-600 text-sm rounded">
                                    Remove
                                </div>
                            </Popup>
                        </div>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
{/if}

{#if $familyData?.pending_members && $familyData.pending_members.length > 0}
    <div class="bg-primary rounded-lg mb-6 w-full text-token card p-4 space-y-4">
        <h5 class="text-xl font-bold mb-4">Pending Members</h5>
        <ul class="space-y-2">
            {#each $familyData.expand.pending_members as pending_member}
                <li class="list flex items-center justify-between">
                    <div class="flex items-center opacity-50">
                        <UserAvatar
                                collectionId={pending_member?.collectionId}
                                userId={pending_member?.id}
                                avatar={pending_member?.avatar}
                                username={pending_member.username}/>
                        <span class="ml-4">{pending_member.username}</span>
                    </div>
                    {#if isCreator}
                        <div class="relative">
                            <button on:click|stopPropagation={() => activePopoverId = pending_member.id}>
                                <Icon src={EllipsisVertical} class="w-6 h-6"/>
                            </button>
                            <Popup isOpen={activePopoverId === pending_member.id}
                                   bind:loading={isLoading}
                                   handleClose={handleClosePopover}>
                                <div on:click={() => resendInvite(pending_member)}
                                     class="w-full hover:cursor-pointer block p-2 hover:bg-secondary-200 text-sm rounded">
                                    Resend Invite
                                </div>
                                <div on:click={() => removePendingMember(pending_member.id)}
                                     class="w-full hover:cursor-pointer block p-2 text-error-600 text-sm rounded">
                                    Remove
                                </div>
                            </Popup>
                        </div>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
{/if}

