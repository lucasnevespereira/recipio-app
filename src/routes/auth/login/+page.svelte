<script lang="ts">
    import {enhance} from '$app/forms'
    import {pb} from '$lib/pocketbase'
    import {sendToast} from "$lib/utils/toast";
    import Spinner from "$lib/components/Spinner.svelte";
    import {Eye, EyeSlash, Icon} from 'svelte-hero-icons';

    let loading;
    let showPassword = false;

    const submitLogin = () => {
        loading = true;
        pb.authStore.loadFromCookie(document.cookie)
        return async ({result, update}) => {
            switch (result.type) {
                case 'success':
                    await update();
                    break;
                case 'failure':
                    sendToast('Invalid credentials', 'error')
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
        action="?/login"
        class="mx-auto max-w-2xl sm:px-6 lg:px-8 w-full"
        use:enhance={submitLogin}
>
    <div class="flex flex-col items-center mb-8">
        <h2 class="h2 font-bold text-center">Log in</h2>
        <small class="text-center mt-1">
            Or <a href="/auth/signup" class="text-primary font-medium hover:cursor-pointer hover:underline"
        >sign up</a
        > if you don't already have an account.
        </small>
    </div>

    <div class="form-control gap-2 space-y-4 mb-4">
        <input
                type="text"
                name="username"
                placeholder="Username or Email"
                class="input input-bordered"
        />
        <div class="relative">
            <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    class="input input-bordered pr-10"
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
        <div class="w-full max-w-md ml-2">
            <a href="/auth/reset-password" class="font-light text-sm text-primary hover:cursor-pointer">
                Forgot Password?
            </a>
        </div>
        <div class="w-full flex items-center">
            <button class="btn variant-filled">Log in</button>
        </div>

    </div>
</form>

{#if loading}
    <div class="mx-auto">
        <Spinner />
    </div>
{/if}
