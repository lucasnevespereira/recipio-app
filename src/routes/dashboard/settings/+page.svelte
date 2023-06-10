<script lang="ts">
    import {applyAction, enhance} from '$app/forms'
    import {invalidateAll} from "$app/navigation";
    import {pb} from "$lib/pocketbase";
    import {error} from "@sveltejs/kit";
    import {sendToast} from "$lib/utils/toast";
    import {sendConfirmModal} from "$lib/utils/modal";
    export let form;
    export let data;
    let loading;
    $: loading = false;
    const submitUpdateEmail = () => {
        loading = true;
        return async ({ result }) => {
            switch (result.type) {
                case 'success':
                    await invalidateAll();
                    break;
                case 'error':
                    break;
                default:
                    await applyAction(result);
            }
            loading = false;
        };
    };


    const deleteAccount = async () => {
        try {
            await pb.collection('users').delete(data.user.id);
        } catch (e) {
            console.error(e);
            throw error(e.status, e.message);
        }

        sendToast("Recipe deleted")
        window.location.href = '/dashboard/recipes'
    }
    const triggerDeleteAccount = () => {
        sendConfirmModal('Delete Account', "Are you sure you want to delete your account?", deleteAccount)
    }
</script>

<div class="flex flex-col items-start mb-8">
    <h3 class="h3 font-bold">Settings</h3>
</div>

<div class="form-control gap-2 space-y-4 mb-4">
    <h4 class="h4">Your email</h4>
    <hr/>
    <form action="?/updateEmail" method="POST" class="flex flex-col space-y-2 w-full" use:enhance={submitUpdateEmail}>
        <input
                type="email"
                placeholder={data.user.email}
                value={data.user.email}
                disabled
                class="input input-bordered w-80"
        />
<!--TODO: uncomment after change email provider max free account reached-->
<!--        <input-->
<!--                type="email"-->
<!--                name="newEmail"-->
<!--                placeholder="Enter your new email"-->
<!--                required-->
<!--                class="input input-bordered"-->
<!--        />-->


<!--        <div class="w-full max-w-lg pt-3">-->
<!--            <button class="btn variant-filled" disabled={loading}>Change my email</button>-->
<!--        </div>-->
    </form>
    {#if form?.updateEmailSuccess}
        <div class="alert variant-filled-success mt-3">
            <p class="alert-message">Email changed!</p>
        </div>
    {/if}

    {#if form?.updateEmailError}
        <div class="alert variant-filled-error mt-3">
            <p class="alert-message">Something went wrong</p>
        </div>
    {/if}
</div>

<div class="form-control gap-2 space-y-4 mb-4">
    <hr/>
    <div class="w-full max-w-lg pt-3">
            <button on:click={triggerDeleteAccount} class="btn variant-filled-error">Delete my account</button>
        </div>
</div>


