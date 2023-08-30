<script lang="ts">
    import {enhance} from '$app/forms'
    import {error} from '@sveltejs/kit';
    import {pb} from '$lib/pocketbase';
    import {sendToast} from "$lib/utils/toast";
    import {slugify, generateInviteToken} from "$lib/utils/text";
    import {ArrowLeft, Icon} from "svelte-hero-icons";
    import RichEditor from "$lib/components/RichEditor/RichEditor.svelte";
    import {SlideToggle} from "@skeletonlabs/skeleton";
    import Spinner from "$lib/components/Spinner.svelte";

    export let data
    let familyName = '';
    let pageTitle = '';
    let slug = '';
    let pageAboutTitle = ''
    let pageAboutContent = '';
    let recipesMenuName = '';
    let aboutMenuName = ''
    let showAuthors = false
    let loading;

    const toggleShowAuthors = () => {
        showAuthors = !showAuthors
    }

    const createFamily = async () => {
        loading = true
        if (!data.user.id) {
            throw error("no user id");
        }
        let formData = new FormData();
        formData.append('name', familyName);
        formData.append('page_title', pageTitle);
        formData.append('slug', slugify(slug))
        formData.append('creator', data.user.id);
        formData.append('invite_token', generateInviteToken())
        formData.append('about_title', pageAboutTitle);
        formData.append('about_content', pageAboutContent);
        formData.append('menu_about_name', aboutMenuName);
        formData.append('menu_recipes_name', recipesMenuName);
        formData.append('show_authors', JSON.stringify(showAuthors))

        try {
            const family = await pb.collection('families').create(formData);
            await pb.collection('users').update(data.user.id, {
                families: [family.id],
            });
        } catch (e) {
            console.log(e);
            loading = false
            if (e.status && e.message) {
                sendToast('Could not create family', 'error');
                throw error(e.status, e.message);
            } else {
                sendToast('Could not create family', 'error');
                throw error(500, e.toString());

            }
        }

        loading = false
        sendToast('Family Created');
        window.location.href = "/dashboard/families"
    };
</script>


<div class="flex items-center justify-between">
    <a class="flex items-center h4" href="/dashboard/families">
        <Icon src={ArrowLeft} class="w-4 h-4"/>
        <span class="ml-1">Back to Families</span>
    </a>
    <button type="button" on:click={createFamily} class="btn variant-filled">Create Family</button>
</div>
<form method="POST" class="form-wrapper" use:enhance={createFamily}>
    <section class="form-section">
        <h2>Basic Information</h2>
        <div class="grid grid-cols-1 lg:grid-rows-1 lg:gap-6">
            <div>
                <label class="label mb-3">
                    <span>Family Name</span>
                    <input class="input" type="text" bind:value={familyName} placeholder="Enter family name"/>
                </label>
                <label class="label mb-3">
                    <span>Page Title</span>
                    <input class="input" type="text" bind:value={pageTitle} placeholder="Enter page title"/>
                </label>
                <label class="label mb-4">
                    <span>Page Slug</span>
                    <input class="input" type="text" bind:value={slug} placeholder="Enter page slug"/>
                </label>
                <label class="label mb-3 flex flex-col">
                    <span>Show Authors</span>
                    <SlideToggle name="show_authors"
                                 size="sm"
                                 on:click={toggleShowAuthors}>{showAuthors ? "Yes" : "No"}</SlideToggle>
                </label>

            </div>
        </div>
    </section>

    <section class="form-section">
        <h2>About Page Information</h2>
        <div class="grid grid-cols-1 lg:grid-rows-1 lg:gap-6">
            <div>
                <label class="label mb-3">
                    <span>Page About Title</span>
                    <input class="input" type="text" bind:value={pageAboutTitle} placeholder="Enter page about title"/>
                </label>
                <label class="label mb-3">
                    <span>Page About Content</span>
                    <RichEditor bind:editorValue={pageAboutContent}/>
                    <textarea name="about_content" class="hidden" bind:value={pageAboutContent}></textarea>
                </label>
            </div>
        </div>
    </section>

    <section class="form-section">
        <h2>Navigation Menu Names</h2>
        <div class="grid grid-cols-1 lg:grid-rows-1 lg:gap-6">
            <div>
                <label class="label mb-3">
                    <span>Recipes Menu Name</span>
                    <input class="input" type="text" bind:value={recipesMenuName}
                           placeholder="Enter recipes menu name"/>
                </label>
                <label class="label mb-3">
                    <span>About Menu Name</span>
                    <input class="input" type="text" bind:value={aboutMenuName} placeholder="Enter about menu name"/>
                </label>
            </div>
        </div>
    </section>

    <div class="form-section-action">
        <button type="submit" class="btn variant-filled">Create Family</button>
    </div>
</form>

{#if loading}
    <div class="mx-auto">
        <Spinner/>
    </div>
{/if}

<style>
    .form-wrapper {
        padding: 0 1rem;
    }

    .form-section {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #e5e5e5;
    }

    h2 {
        font-size: 1.2rem; /* Reduced font size for mobile */
        margin-bottom: 1rem;
    }

    .form-section-action {
        margin-top: 2rem;
    }

    /* Adjustments for tablet screens */
    @media (min-width: 768px) {
        .form-wrapper {
            padding: 0 2rem; /* Increased padding for tablets */
        }

        h2 {
            font-size: 1.4rem; /* Increased font size for tablets */
        }
    }

    /* Adjustments for desktop screens */
    @media (min-width: 1024px) {
        .form-wrapper {
            padding: 0 5rem; /* Increased padding for desktop */
        }

        .form-section {
            margin-bottom: 3rem; /* Increased space between sections for clarity */
        }

        h2 {
            font-size: 1.5rem; /* Restored font size for desktop */
        }
    }
</style>
