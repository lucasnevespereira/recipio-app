<script lang="ts">
    import {FileDropzone, InputChip, ListBox, ListBoxItem} from "@skeletonlabs/skeleton";
    import RichEditor from "$lib/components/RichEditor/RichEditor.svelte";
    import {ArrowLeft, Icon} from "svelte-hero-icons";
    import {onMount} from "svelte";
    import {pb} from "$lib/pocketbase";
    import {sendToast} from "$lib/utils/toast";
    import {error} from "@sveltejs/kit";

    export let data;
    let files: FileList;
    let ingredientsTmpList = [];

    onMount(() => {
        // Initialize temporaryList with data.recipe.ingredients if it exists
        if (data.recipe.ingredients && typeof data.recipe.ingredients === 'object') {
            ingredientsTmpList = Object.values(data.recipe.ingredients);
        }
    });

    const updateRecipe = async () => {
        if (!data.user.id) {
            throw error("no user id");
        }

        let formData = new FormData()
        formData.append('user_id', data.user.id);
        formData.append("title", data.recipe.title)
        formData.append("description", data.recipe.description)
        formData.append("instructions", data.recipe.instructions)

        data.recipe.families.forEach(family => {
            formData.append("families", family);
        });

        const families = formData.getAll("families")
        if (families.length === 0) {
            formData.append("families", "")
        }

        const recipeIngredients = {};
        ingredientsTmpList.forEach((element, index) => {
            recipeIngredients[index] = element;
        });

        formData.append("ingredients", JSON.stringify(recipeIngredients))

        if (files && files.item(0)) {
            formData.append("photo", files.item(0))
        }

        try {
            await pb.collection('recipes').update(data.recipe.id, formData);
            sendToast('Recipe Updated');
        } catch (e) {
            sendToast('Could not create recipe', 'error');
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
        <a href={`/dashboard/recipes/${data.recipe.id}`}>{data.recipe.title}</a>
    </h4>
    <button type="button" class="btn variant-ghost-secondary" on:click={updateRecipe}> Save Recipe</button>
</div>

<div class="form-wrapper">

    <!-- Basic Information Section -->
    <section class="form-section">
        <h2>Basic Information</h2>
        <div class="grid grid-cols-1 lg:grid-rows-1 lg:gap-6">
            <div>
                <label class="label mb-3">
                    <span>Title</span>
                    <input class="input" type="text" bind:value={data.recipe.title} placeholder="Recipe Title"/>
                </label>

                <label class="label mb-3">
                    <span>Description</span>
                    <textarea
                            class="textarea"
                            bind:value={data.recipe.description}
                            rows="4"
                            placeholder="Describe your recipe"></textarea>
                </label>

                <label class="label mb-3">
                    <span>Image</span>
                    <FileDropzone name="files" bind:files>
                        <svelte:fragment slot="message">Upload a <b>recipe image</b></svelte:fragment>
                    </FileDropzone>

                    {#if data.recipe.photo && !files}
                        <div class="card p-4 w-100">
                            <span class="preview">{data.recipe.photo}</span>
                        </div>
                    {/if}

                    {#if files && files.item(0)}
                        <div class="card p-4 w-100">
                            <span class="preview">{files.item(0).name}</span>
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
                    <InputChip
                            bind:value={ingredientsTmpList}
                            name="ingredients"
                            placeholder="Enter recipe ingredients..."
                    />
                </label>

                <label class="label mb-3">
                    <span>Instructions</span>
                    <RichEditor bind:editorValue={data.recipe.instructions}/>
                    <textarea name="instructions" class="hidden" bind:value={data.recipe.instructions}></textarea>
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
                                <ListBoxItem bind:group={data.recipe.families} name="families"
                                             value={family.id}>{family.name}</ListBoxItem>
                            {/each}
                        </ListBox>
                    </label>
                </div>
            </div>
        </section>
    {/if}

    <div class="form-section-action">
        <button type="button" on:click={updateRecipe} class="btn variant-ghost-secondary">Save Recipe</button>
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
