<script lang="ts">
    import {getImageURL} from "$lib/utils/image";
    import {invalidateAll} from "$app/navigation";
    import {applyAction, enhance} from "$app/forms";
    import {Avatar} from "@skeletonlabs/skeleton";
    import { ArrowUpRight, Icon} from "svelte-hero-icons";

    export let data;

    // const currentProtocol = window.location.protocol;
    // const currentHost = window.location.host;
    const currentUrl = `http://localhost:5173`;
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
            refreshIframe(`${currentUrl}/${data.user.username}`)
            loading = false
        }
    }

    const refreshIframe = (url: string) => {
        const iframe = document.getElementById('preview-iframe');
        iframe.src = url;
    };
</script>
<div class="flex flex-col md:flex-row lg:flex-row h-full justify-between">
    <div class="flex flex-col w-full md:w-1/2 lg:w-1/2 h-full">
        <form
                action="?/updateProfile"
                method="POST"
                enctype="multipart/form-data"
                class="flex flex-col space-y-4 w-full"
                use:enhance={submitUpdateProfile}
        >
            <div class="flex">
                <h3 class="text-2xl font-medium">Update Profile</h3>
                <a href={`${currentUrl}/${data.user.username}`} target="_blank" class="btn variant-ghost-secondary btn-sm w-50 ml-3">
                    <span>Your Page</span>
                    <span><Icon src={ArrowUpRight} class="w-4 h-4"/></span>
                </a>
            </div>
            <div class="form-control w-full max-w-lg">
                <label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
                    <Avatar
                            src={data.user?.avatar
							? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
							: `https://ui-avatars.com/api/?name=${data.user?.name}`}
                            alt="user avatar"
                            id="avatar-preview"
                            class="w-32 rounded"
                    />
                </label>
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
                <input type="text" class="input input-bordered" placeholder="Profile Name" name="name"
                       value={data?.user?.name} disabled={loading}>
            </div>
            <div class="w-full max-w-lg pt-3">
                <button class="btn variant-filled" type="submit" disabled={loading}>
                    Update Profile
                </button>
            </div>
            {#if form?.success}
                <div class="alert variant-filled-success mt-3">
                    <p class="alert-message">Profile Updated</p>
                </div>
            {/if}
        </form>
    </div>
    <div class="flex flex-row mx-auto pt-10 lg:p-0">
            <iframe title="preview-iframe" id="preview-iframe" class="preview-iframe"
                    src={`${currentUrl}/${data.user.username}`}
                    sandbox="allow-same-origin allow-scripts allow-popups"></iframe>
    </div>
</div>


<style>

    .preview-iframe {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100vh;
        max-width: 420px;
        max-height: 664px;
        border: 10px solid black;
        border-radius: 49px;
        -moz-box-shadow:    inset 0 0 12px #494949;
        -webkit-box-shadow: inset 0 0 12px #494949;
        box-shadow:         inset 2px 0 12px #494949;
    }


    .preview-container{
        display: block;
        max-width: 319.6px;
        max-height: 664.4px;
        background: white;
        border-radius: 48.6px;
        -moz-box-shadow:    inset 0 0 12px #494949;
        -webkit-box-shadow: inset 0 0 12px #494949;
        box-shadow:         inset 2px 0 12px #494949;
    }
</style>

