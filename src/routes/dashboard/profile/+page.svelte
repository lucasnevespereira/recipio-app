<script lang="ts">
    import {ArrowLeft, Icon, Pencil} from 'svelte-hero-icons'
    import {getImageURL} from "$lib/utils/image";
    import {invalidateAll} from "$app/navigation";
    import {applyAction, enhance} from "$app/forms";
    import {Avatar} from "@skeletonlabs/skeleton";

    export let data;
    export let form;
    let loading
    $: loading = false
    const showPreview = (event) => {
        const target = event.target
        const files = target.files

        if (files.length > 0) {
            const src = URL.createObjectURL(files[0])
            const preview = document.getElementById('avatar-preview')
            preview.src = src
        }
    }

    const submitUpdateProfile = () => {
        loading = true
        return async ({result}) => {
            switch (result.type) {
                case 'success':
                    await invalidateAll()
                    break
                case 'error':
                    break
                default:
                    await applyAction(result)
            }
            loading = false
        }
    }
</script>
<div class="flex flex-row h-full justify-between">
    <div class="flex flex-col w-1/2 h-full">
        <form
                action="?/updateProfile"
                method="POST"
                enctype="multipart/form-data"
                class="flex flex-col space-y-4 w-full"
                use:enhance={submitUpdateProfile}
        >
            <h3 class="text-2xl font-medium mb-6">Update Profile</h3>
            <div class="form-control w-full max-w-lg">
                <label for="name" class="label font-bold mb-2 ml-2">Profile Picture</label>
                        <Avatar
                                src={data.user?.avatar
							? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
							: `https://ui-avatars.com/api/?name=${data.user?.name}`}
                                alt="user avatar"
                                id="avatar-preview"
                                class="w-32 rounded hover:cursor-pointer"
                        />
                <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        value=""
                        accept="image/*"
                        hidden
                        disabled={loading}
                        on:change={showPreview}
                />
            </div>
            <div class="form-control w-full max-w-lg">
                <label for="name" class="label font-bold mb-2 ml-2">Profile Name</label>
                <input type="text" class="input input-bordered w-80" placeholder="Profile Name" name="name" value={data?.user?.name} disabled={loading}>
            </div>
            <div class="w-full max-w-lg pt-3">
                <button class="btn variant-filled" type="submit" disabled={loading}>
                    Update Profile
                </button>
            </div>
            {#if form?.success}
                error
            {/if}
        </form>
    </div>
    <div class="flex flex-row w-1/2 mx-auto">
        Preview
    </div>
</div>

