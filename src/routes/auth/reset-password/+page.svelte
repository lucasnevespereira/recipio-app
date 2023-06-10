<script lang="ts">
    import {sendToast} from "$lib/utils/toast";

    export let form;
</script>


<form
        method="POST"
        action="?/resetPassword"
        class="mx-auto max-w-7xl sm:px-6 lg:px-8"
>
    <div class="flex flex-col items-center mb-8">
        <h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
            Reset your password
        </h2>
        <p class="text-center mt-1">
            We'll send you an email with a link to reset your password
        </p>
    </div>

    <div class="form-control gap-2 space-y-4 mb-4">
        <input
                type="email"
                name="email"
                placeholder="Your Email"
                class="input input-bordered"
        />
        <div class="w-full flex items-center">
            <button class="btn variant-filled">Request Password Reset</button>
        </div>

        {#if form?.success}
            <div class="alert variant-filled-success mt-3">
                <p class="alert-message">An email has been sent to reset your password!</p>
            </div>
        {/if}
    </div>
</form>



