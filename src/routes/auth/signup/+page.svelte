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
        <h1 class="text-2xl text-center">Sign Up</h1>
        <small class="text-center mt-1">
            Or <a href="/auth/login" class="text-primary font-medium hover:cursor-pointer hover:underline"
        >login</a
        > if you already have an account.
        </small>
    </div>
    <div class="form-control gap-2 space-y-4 mb-4">
        <input
                type="text"
                name="username"
                placeholder="Username"
                class="input input-bordered"
        />
        <input
                type="email"
                name="email"
                placeholder="Email"
                class="input input-bordered"
        />
        <input
                type="password"
                name="password"
                placeholder="Password"
                class="input input-bordered"
        />
        <input
                type="password"
                name="passwordConfirm"
                placeholder="Password Confirm"
                class="input input-bordered"
        />
        <div class="w-full flex items-center">
            <button class="btn variant-filled">Sign up</button>
        </div>
    </div>
</form>