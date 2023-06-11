<script lang="ts">
    import {FileDropzone, InputChip} from "@skeletonlabs/skeleton";
    import RichEditor from "$lib/components/RichEditor/RichEditor.svelte";
    import {ArrowLeft, Icon} from "svelte-hero-icons";
    import {onMount} from "svelte";
    import {currentUser, pb} from "$lib/pocketbase";
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
        let formData = new FormData()

        if ($currentUser) {
            formData.append('user_id', $currentUser.id);
        }

        formData.append("title", data.recipe.title)
        formData.append("description", data.recipe.description)
        formData.append("instructions", data.recipe.instructions)


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
    	<button type="button" class="btn variant-ghost-secondary" on:click={updateRecipe}> Save Recipe </button>
</div>


<form enctype="multipart/form-data">
    <div class="grid grid-cols-2 gap-6">
        <div class="left">
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

            <label class="label mb-3" for="">
                <span>Image</span>
                <FileDropzone name="files" bind:files>
                    <svelte:fragment slot="message">Upload a <b>recipe image</b></svelte:fragment>
                </FileDropzone>
                {#if data.recipe.photo && !files}
                    <div class="card p-4 w-100">
						<span class="preview">
							{data.recipe.photo}
						</span>
                    </div>
                {/if}

                {#if files && files.item(0)}
                    <div class="card p-4 w-100">
						<span class="preview">
							{files.item(0).name}
						</span>
                    </div>
                {/if}

            </label>

<!--            <div class="mt-10">-->
<!--                <button type="button" on:click={updateRecipe} class="btn variant-filled"-->
<!--                >Update Recipe-->
<!--                </button-->
<!--                >-->
<!--            </div>-->
        </div>
        <div class="right">
            <label class="label mb-3" for="ingredients">
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
</form>