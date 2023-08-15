<script lang="ts">
    import {error} from '@sveltejs/kit';
    import {pb} from '$lib/pocketbase';
    import {sendToast} from "$lib/utils/toast";
    import {slugify} from "$lib/utils/text";
    import {ArrowLeft, Icon} from "svelte-hero-icons";

    export let data
    let familyName = '';
    let pageTitle = '';
    let slug = '';
    const createFamily = async () => {
        if (!data.user.id) {
            throw error("no user id");
        }
        let formData = new FormData();
        formData.append('name', familyName);
        formData.append('page_title', pageTitle);
        formData.append('members', "")
        formData.append('slug', slugify(slug))
        formData.append('creator', data.user.id);

        try {
            const family = await pb.collection('families').create(formData);
            await pb.collection('users').update(data.user.id, {
                families: [family.id],
            });
        } catch (e) {
            console.log(e);
            if (e.status && e.message) {
                sendToast('Could not create family', 'error');
                throw error(e.status, e.message);
            } else {
                sendToast('Could not create family', 'error');
                throw error(500, e.toString());
            }
        }

        sendToast('Family Created');
        window.location.href = "/dashboard/families"
    };
</script>

<div class="flex items-center justify-between">
    <a class="flex items-center h4" href="/dashboard/families">
        <Icon src={ArrowLeft} class="w-4 h-4"/>
        <span class="ml-1">
            Back to Families
	</span>
    </a>

    <button type="button" on:click={createFamily} class="btn variant-filled">Create Family</button>
</div>


<form>
    <div class="grid lg:grid-cols-2 grid-cols-1 lg:grid-rows-1 lg:gap-6">
        <div class="left">
            <label class="label mb-3">
                <span>Family Name</span>
                <input class="input" type="text" bind:value={familyName} placeholder="Enter family name"/>
            </label>
            <label class="label mb-3">
                <span>Page Title</span>
                <input class="input" type="text" bind:value={pageTitle} placeholder="Enter page title"/>
            </label>
            <label class="label mb-3">
                <span>Page Slug</span>
                <input class="input" type="text" bind:value={slug} placeholder="Enter page slug"/>
            </label>

            <!--            <label class="label mb-3">-->
            <!--                <SearchMembers />-->
            <!--            </label>-->


            <div class="lg:invisible mt-10">
                <button type="button" on:click={createFamily} class="btn variant-filled">
                    Create Family
                </button>
            </div>
        </div>
        <div class="right">
        </div>
    </div>
</form>


<style></style>
