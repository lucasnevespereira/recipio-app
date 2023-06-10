<script lang="ts">
    import {applyAction, enhance} from '$app/forms'
    import {pb} from '$lib/pocketbase'
</script>

<form
        method="POST"
        class="mx-auto max-w-7xl sm:px-6 lg:px-8"
        use:enhance={() => {
    return async ({ result }) => {
      pb.authStore.loadFromCookie(document.cookie)
      await applyAction(result)
    }
  }}
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
        <input
                type="password"
                name="password"
                placeholder="Password"
                class="input input-bordered"
        />
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