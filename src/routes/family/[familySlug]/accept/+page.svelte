<script>
    import {onMount} from 'svelte';
    import {pb} from "$lib/pocketbase/index";

    export let data;
    let userID;
    let token;
    let accepted = false;
    let errorMessage = "";
    let loading = false; // Added loading state

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        token = urlParams.get('token');
        userID = urlParams.get('userID');

        if (!token || !userID) {
            errorMessage = "Token or user ID missing in the URL";
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

                accepted = true;
            } else {
                throw new Error("Failed to accept the invitation");
            }
        } catch (error) {
            errorMessage = error.message;
        } finally {
            loading = false;
        }
    }
</script>

<div class="min-h-fit flex items-center justify-center p-20">
    <div class="rounded-lg shadow-md p-6 w-full max-w-md">
        <h1 class="text-2xl text-center font-semibold mb-4">Accept {data.family.name} Invitation</h1>

        {#if errorMessage}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span class="block sm:inline">{errorMessage}</span>
            </div>
        {/if}

        {#if loading}
            <div class="flex justify-center items-center py-2 px-4 rounded-full w-full bg-gray-300">
                <div class="loader"></div>
            </div>
        {:else if !accepted}
            <button
                    on:click={acceptInvitation}
                    class="bg-secondary-500 hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded-full w-full"
            >
                Accept Invitation
            </button>
        {:else}
            <p class="text-green-600 font-medium text-center">You've successfully joined the family!</p>
        {/if}
    </div>
</div>

<!-- Styles for the loader -->
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
