<script lang="ts">
    import {enhance} from '$app/forms'
    import Input from "$lib/components/Input.svelte";
    import UsernameInput from "$lib/components/UsernameInput.svelte";
    import {pb} from "$lib/pocketbase";
    import {sendToast} from "$lib/utils/toast";
    import Spinner from "$lib/components/Spinner.svelte";
    import {Eye, EyeSlash, Icon} from "svelte-hero-icons";

    export let form;
    let loading;
    let showPassword = false;
    const submitRegister = () => {
        loading = true;
        pb.authStore.loadFromCookie(document.cookie)
        return async ({result, update}) => {
            switch (result.type) {
                case 'success':
                    await update();
                    break;
                case 'error':
                    sendToast(result.error.message, 'error');
                    break;
                default:
                    await update();
            }
            loading = false;
        };
    }
    const togglePasswordVisibility = () => {
        showPassword = !showPassword;
    }
</script>

<form
        method="POST"
        action="?/register"
        use:enhance={submitRegister}
        class="mx-auto max-w-2xl sm:px-6 lg:px-8 w-full"
>
    <div class="flex flex-col items-center mb-8">
        <h2 class="h2 font-bold text-center">Sign Up</h2>
        <small class="text-center mt-1">
            Or <a href="/auth/login" class="text-primary font-medium hover:cursor-pointer hover:underline"
        >login</a
        > if you already have an account.
        </small>
    </div>
    <div class="form-control gap-2 space-y-4 mb-4">
        <UsernameInput
                type="text"
                id="username"
                placeholder="Username"
                label="Username"
                value={form?.data?.username}
                errors={form?.errors?.username}
        />
        <Input
                type="email"
                id="email"
                placeholder="Email"
                label="Email"
                value={form?.data?.email}
                errors={form?.errors?.email}
        />
        <div class="relative">
            <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    label="Password"
                    value={form?.data?.password}
                    errors={form?.errors?.password}
            />
            <button type="button"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm font-medium"
                    on:click={togglePasswordVisibility}>
                {#if showPassword}
                    <Icon src={Eye} class="w-5 h-5"/>
                {:else}
                    <Icon src={EyeSlash} class="w-5 h-5"/>
                {/if}
            </button>
        </div>

        <Input
                type="password"
                id="passwordConfirm"
                placeholder="Password Confirm"
                label="Password Confirm"
                value={form?.data?.passwordConfirm}
                errors={form?.errors?.passwordConfirm}
        />

        <div class="w-full flex items-center">
            <button class="btn variant-filled">Sign up</button>
        </div>
    </div>
</form>

{#if loading}
    <div class="mx-auto">
        <Spinner/>
    </div>
{/if}