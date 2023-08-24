<script lang="ts">
    import {ArrowLeft, Icon} from "svelte-hero-icons";
    import {pb} from "$lib/pocketbase";
    import {sendToast} from "$lib/utils/toast";
    import {error} from "@sveltejs/kit";
    import {slugify} from "$lib/utils/text";
    import RichEditor from "$lib/components/RichEditor/RichEditor.svelte";

    export let data;
    const updateFamily = async () => {
        if (!data.family.id) {
            throw error("no family id");
        }

        let formData = new FormData()

        formData.append('name', data.family.name);
        formData.append('page_title', data.family.page_title);
        formData.append('slug', slugify(data.family.slug))
        formData.append('about_title', data.family.about_title)
        formData.append('about_content', data.family.about_content)
        formData.append('menu_about_name', data.family.menu_about_name);
        formData.append('menu_recipes_name', data.family.menu_recipes_name);


        try {
            await pb.collection('families').update(data.family.id, formData);
            sendToast('Family Updated');
        } catch (e) {
            sendToast('Could not update family', 'error');
            console.error(e);
            if (e.status && e.message) {
                throw error(e.status, e.message);
            } else {
                throw error(500, e.toString());
            }
        }
    }

</script>


<div class="flex items-center justify-between">
    <h4 class="h4 flex items-center">
        <Icon src={ArrowLeft} class="w-4 h-4"/>
        <a href={`/dashboard/families`}>Back to families</a>
    </h4>
    <button type="button" class="btn variant-ghost-secondary" on:click={updateFamily}> Save Family</button>
</div>

<div class="form-wrapper">
    <section class="form-section">
        <h2>Basic Information</h2>
        <div class="grid grid-cols-1 lg:grid-rows-1 lg:gap-6">
            <div>
                <label class="label mb-3">
                    <span>Family Name</span>
                    <input class="input" type="text" bind:value={data.family.name} placeholder="Enter family name"/>
                </label>
                <label class="label mb-3">
                    <span>Page Title</span>
                    <input class="input" type="text" bind:value={data.family.page_title} placeholder="Enter page title"/>
                </label>
                <label class="label mb-3">
                    <span>Page Slug</span>
                    <input class="input" type="text" bind:value={data.family.slug} placeholder="Enter page slug"/>
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
                    <input class="input" type="text" bind:value={data.family.about_title} placeholder="Enter page about title"/>
                </label>
                <label class="label mb-3">
                    <span>Page About Content</span>
                    <RichEditor bind:editorValue={data.family.about_content}/>
                    <textarea name="about_content" class="hidden" bind:value={data.family.about_content}></textarea>
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
                    <input class="input" type="text" bind:value={data.family.menu_recipes_name}
                           placeholder="Enter recipes menu name"/>
                </label>
                <label class="label mb-3">
                    <span>About Menu Name</span>
                    <input class="input" type="text" bind:value={data.family.menu_about_name} placeholder="Enter about menu name"/>
                </label>
            </div>
        </div>
    </section>

    <div class="form-section-action">
        <button type="button" on:click={updateFamily} class="btn variant-filled">Save Family</button>
    </div>
</div>

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
