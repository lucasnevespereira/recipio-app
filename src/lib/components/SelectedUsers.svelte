<script>
    import {sendToast} from "$lib/utils/toast";
    import {pb, sendInvite} from "$lib/pocketbase/index";
    import {familyData} from "$lib/store/family";
    import UserAvatar from "$lib/components/UserAvatar.svelte";


    export let users = users.map(user => ({...user, isLoading: false}));

    async function inviteUser(user) {
        user.isLoading = true;
        users = [...users]; // Triggers reactivity

        try {
            const inviteData = {
                userID: user.value,
                username: user.label,
                email: user.meta.email,
                token: $familyData.invite_token,
                slug: $familyData.slug
            };

            await sendInvite(inviteData);

            $familyData.pending_members.push(user.value)
            const familyResult = await pb.collection('families').update($familyData.id, {"pending_members": $familyData.pending_members}, {expand: 'pending_members'});
            const updatedFamily = structuredClone(familyResult)
            $familyData.expand.pending_members = updatedFamily.expand.pending_members

            sendToast('User was invited');
            removeUser(user);
        } catch (e) {
            console.error(e)
            sendToast(e.message, 'error');
        } finally {
            user.isLoading = false;
            users = [...users];
        }
    }

    function removeUser(userToRemove) {
        users = users.filter(user => user.value !== userToRemove.value);
    }
</script>

{#if users.length > 0}
    <h5 class="text-xl font-semibold">Selected Users to Invite</h5>
    <ul class="space-y-2">
        {#each users as user}
            <li class="flex items-center justify-between relative">
                {#if user.isLoading}
                    <div class="absolute top-0 left-0 right-0 bottom-0 opacity-60 flex justify-center items-center">
                        <div class="loader"></div>
                    </div>
                {/if}
                <div class="flex items-center">
                    <UserAvatar
                            collectionId={user?.meta.collectionId}
                            userId={user?.value}
                            avatar={user?.meta.avatar}
                            username={user.label}/>
                    <span class="ml-4">{user.label}</span>
                </div>
                <div class="flex items-center space-x-4">
                    <button class="text-white bg-secondary-600 px-4 py-2 rounded hover:bg-secondary-500"
                            on:click={() => inviteUser(user)}>Invite
                    </button>
                    <button class="text-red-500 bg-red-100 px-4 py-2 rounded hover:bg-red-200"
                            on:click={() => removeUser(user)}>Remove
                    </button>
                </div>
            </li>
        {/each}
    </ul>
{/if}

<style>
    .loader {
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top: 4px solid black;
        width: 24px;
        height: 24px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
