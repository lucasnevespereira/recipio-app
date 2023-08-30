<script>
    import {onMount} from 'svelte';
    import {pb} from "$lib/pocketbase/index";
    import Spinner from "$lib/components/Spinner.svelte";
    import {sendToast} from "$lib/utils/toast";

    export let data;
    let userID;
    let token;
    let errorMessage = "";
    let loading = false;

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        token = urlParams.get('token');
        userID = urlParams.get('userID');

        if (!token || !userID) {
            sendToast('Token or userID missing in the URL', 'error')
        }
    });

    async function acceptInvitation() {
        loading = true;
        try {
            if (token === data.family.invite_token) {

                // remove user id from pending_members
                data.family.pending_members = data.family.pending_members.filter(id => id !== userID);
                data.family.members.push(userID);

                await pb.collection('families').update(data.family.id, {
                    "members": data.family.members,
                    "pending_members": data.family.pending_members
                });

                loading = false;
                sendToast("You've successfully joined the family!")
                window.location.href = "/dashboard/families"
            } else {
                throw new Error("Failed to accept the invitation");
            }
        } catch (e) {
            loading = false
            sendToast(e.message, 'error')
        }
    }
</script>

<div class="min-h-fit flex items-center justify-center p-20">
    <div class="rounded-lg shadow-md p-6 w-full max-w-md">
        <h1 class="text-2xl text-center font-semibold mb-4">Accept {data.family.name} Invitation</h1>

        {#if loading}
            <div class="flex justify-center items-center py-2 px-4 rounded-full w-full">
                <Spinner/>
            </div>
        {/if}

        <button
                disabled={loading}
                on:click={acceptInvitation}
                class="bg-secondary-500 hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded-full w-full"
        >
            Accept Invitation
        </button>
    </div>
</div>
