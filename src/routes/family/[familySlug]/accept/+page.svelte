<script>
    import {onMount} from 'svelte';
    import {pb} from "$lib/pocketbase/index";
    import Spinner from "$lib/components/Spinner.svelte";

    export let data;
    let userID;
    let token;
    let accepted = false;
    let loading = false;
    let errorMessage = "";

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        token = urlParams.get('token');
        userID = urlParams.get('userID');

        if (!token || !userID) {
            errorMessage = "Token or userID missing in the URL"
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

                accepted = true
                loading = false;
            } else {
                throw new Error("Failed to accept the invitation");
            }
        } catch (e) {
            loading = false
            errorMessage = e.message;
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

        {#if !accepted}
            <button
                    disabled={loading}
                    on:click={acceptInvitation}
                    class="bg-secondary-500 hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded-full w-full"
            >
                Accept Invitation
            </button>
        {:else}
            <p class="text-green-600 font-medium text-center">You've successfully joined the family!</p>
            <div class="flex justify-center mx-auto">
                <a
                        href="/dashboard/families"
                        class="bg-surface-500 hover:bg-surface-700 text-white font-bold py-2 px-4 rounded-full w-full"
                >
                    Access Recipio Dashboard
                </a>
            </div>
        {/if}
        {#if errorMessage}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span class="block sm:inline">{errorMessage}</span>
            </div>
        {/if}
    </div>
</div>
