<script lang="ts">
    import {FileDropzone, InputChip, ListBox, ListBoxItem, SlideToggle} from '@skeletonlabs/skeleton';
    import RichEditor from '$lib/components/RichEditor/RichEditor.svelte';
    import {error} from '@sveltejs/kit';
    import {pb} from '$lib/pocketbase';
    import {sendToast} from "$lib/utils/toast";
    import {slugify} from "$lib/utils/text";
    import {ArrowLeft, Icon} from "svelte-hero-icons";
    import Spinner from "$lib/components/Spinner.svelte";

    export let data;
    let files: FileList;
    let title = '';
    let description = '';
    let ingredientsList: string[] = [];
    let instructions = '';
    let familiesList: string[] = [];
    let loading;
    let isPrivate = false

    const toggleIsPrivate = () => {
        isPrivate = !isPrivate
    }

    let fileSizeError = "";
    const checkFileSize = () => {
        if (files && files.item(0)) {
            const fileSize = files.item(0).size;
            const maxFileSize = 5242880; // 5MB in bytes

            if (fileSize > maxFileSize) {
                fileSizeError = "File size too large (exceeds the 5MB limit.)";
            } else {
                fileSizeError = "";
            }
        }
    };

    const createRecipe = async () => {
        loading = true;
        if (!data.user.id) {
            throw error("no user id");
        }
        let formData = new FormData();
        formData.append('user_id', data.user.id);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('instructions', instructions);
        formData.append('slug', slugify(title))
        formData.append('private', JSON.stringify(isPrivate))

        if (familiesList.length > 0) {
            familiesList.forEach(family => {
                formData.append("families", family);
            });
        }

        const recipeIngredients = {};
        ingredientsList.forEach((element, index) => {
            recipeIngredients[index] = element;
        });

        formData.append('ingredients', JSON.stringify(recipeIngredients));

        if (files && files.item(0)) {
            formData.append('photo', files.item(0));
        }
        try {
            await pb.collection('recipes').create(formData);
        } catch (e) {
            console.error(e);
            loading = false
            sendToast('Could not create recipe', 'error');
            throw error(e.status, e.message);
        }

        loading = false;
        sendToast('Recipe Created');
        window.location.href = "/dashboard/recipes"
    };
</script>

<div class="flex items-center justify-between">
    <a class="flex items-center h4" href="/dashboard/recipes">
        <Icon src={ArrowLeft} class="w-4 h-4"/>
        <span class="ml-1">Back to Recipes</span>
    </a>
    <button type="button" on:click={createRecipe} class="btn variant-filled">Create Recipe</button>
</div>

<div class="form-wrapper">

    <!-- Basic Information Section -->
    <section class="form-section">
        <h2>Basic Information</h2>
        <div class="grid grid-cols-1 lg:grid-rows-1 lg:gap-6">
            <div>
                <label class="label mb-3">
                    <span>Title</span>
                    <input class="input" type="text" bind:value={title} placeholder="Recipe Title"/>
                </label>

                <label class="label mb-3">
                    <span>Description</span>
                    <textarea class="textarea" bind:value={description} rows="4"
                              placeholder="Describe your recipe"></textarea>
                </label>


                <label class="label mb-3 flex flex-col">
                    <span>Private</span>
                    <SlideToggle name="private"
                                 size="sm"
                                 on:click={toggleIsPrivate}>{isPrivate ? "Yes" : "No"}</SlideToggle>
                </label>

                <label class="label mb-3">
                    <span>Image</span>
                    <FileDropzone name="files" bind:files on:change={checkFileSize}>
                        <svelte:fragment slot="message">Upload a <b>recipe image</b></svelte:fragment>
                    </FileDropzone>
                    {#if fileSizeError}
                        <div class="text-error-500">
                            {fileSizeError}
                        </div>
                    {/if}
                    {#if files && files.item(0).name && fileSizeError.length === 0}
                        <div class="card p-4 w-100">
                            <span class="preview">{files[0].name}</span>
                        </div>
                    {/if}
                </label>
            </div>
        </div>
    </section>

    <!-- Ingredients & Instructions Section -->
    <section class="form-section">
        <h2>Recipe Details</h2>
        <div class="grid grid-cols-1 lg:grid-rows-1 lg:gap-6">
            <div>
                <label class="label mb-3">
                    <span>Ingredients</span>
                    <InputChip bind:value={ingredientsList} name="ingredients"
                               placeholder="Enter recipe ingredients..."/>
                </label>

                <label class="label mb-3">
                    <span>Instructions</span>
                    <RichEditor bind:editorValue={instructions}/>
                    <textarea name="instructions" class="hidden" bind:value={instructions}></textarea>
                </label>
            </div>
        </div>
    </section>

    {#if data.families.length > 0}
        <!-- Families Association Section -->
        <section class="form-section">
            <h2>Association</h2>
            <div class="grid grid-cols-1 lg:grid-rows-1 lg:gap-6">
                <div>

                    <label class="label mb-3">
                        <span>Add to Family</span>
                        <ListBox multiple>
                            {#each data.families as family}
                                <ListBoxItem bind:group={familiesList} name="medium"
                                             value={family.id}>{family.name}</ListBoxItem>
                            {/each}
                        </ListBox>
                    </label>

                </div>
            </div>
        </section>
    {/if}


    <div class="form-section-action">
        {#if loading}
            <div class="mx-auto">
                <Spinner/>
            </div>
        {/if}
        <button on:click={createRecipe} class="btn variant-filled">Create Recipe</button>
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

