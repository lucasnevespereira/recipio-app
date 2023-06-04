<script lang="ts">
    import {FileDropzone, InputChip, toastStore} from '@skeletonlabs/skeleton';
    import RichEditor from "$lib/components/RichEditor/RichEditor.svelte"
    import {error, redirect} from "@sveltejs/kit";
    import {pb, currentUser, login} from "$lib/pocketbase";
    import type {ToastSettings} from '@skeletonlabs/skeleton';

    let files: FileList;
    let title = ""
    let description = ""
    let ingredientsList: string[] = [];
    let instructions = ""

    const toast = (message, type = "success") => {
        let toastColor = "variant-filled-success"
        if (type == "warning") {
            toastColor = "variant-filled-warning"
        } else if (type == "error") {
            toastColor = "variant-filled-error"
        }

        const t: ToastSettings = {message, background: toastColor}

        toastStore.trigger(t)
    }

    const createRecipe = async () => {
        try {
            await login("username", "password")
        } catch (e) {
            console.error(e)
        }

        let formData = new FormData();
        if ($currentUser) {
            formData.append("user_id", $currentUser.id)
        }
        formData.append("title", title)
        formData.append("description", description)
        formData.append("instructions", instructions)

        const recipeIngredients = {}
        ingredientsList.forEach((element, index) => {
            recipeIngredients[index] = element;
        });

        formData.append("ingredients", JSON.stringify(recipeIngredients))

        if (files.item(0)) {
            formData.append("photo", files.item(0))
        }

        console.log(formData)

        try {
            await pb.collection('recipes').create(formData)
        } catch (e) {
            toast("Could not create recipe", "error")
            console.log(e);
            if (e.status && e.message) {
                throw error(e.status, e.message);
            } else {
                throw error(500, e.toString());
            }
        }

        toast("Recipe Created")

        throw redirect(303, '/me/recipes')
    }
</script>

<form>
    <div class="grid grid-cols-2 gap-6">
        <div class="left">
            <label class="label mb-3">
                <span>Title</span>
                <input class="input" type="text" bind:value={title} placeholder="Recipe Title"/>
            </label>

            <label class="label mb-3">
                <span>Description</span>
                <textarea class="textarea" bind:value={description} rows="4"
                          placeholder="Describe your recipe"></textarea>
            </label>

            <label class="label mb-3" for="">
                <span>Image</span>
                <FileDropzone name="files" bind:files>
                    <svelte:fragment slot="message">Upload a <b>recipe image</b></svelte:fragment>
                </FileDropzone>
                {#if files && files.item(0).name}
                    <div class="card p-4 w-100">
                        <span class="preview">
                            {files[0].name}
                        </span>
                    </div>
                {/if}
            </label>

            <div class="mt-10">
                <button type="button" on:click={createRecipe} class="btn variant-filled">Create Recipe</button>
            </div>
        </div>
        <div class="right">
            <label class="label mb-3" for="ingredients">
                <span>Ingredients</span>
                <InputChip bind:value={ingredientsList} name="ingredients" placeholder="Enter recipe ingredients..."/>
            </label>
            <label class="label mb-3">
                <span>Instructions</span>
                <RichEditor bind:editorValue={instructions}/>
                <textarea name="instructions" class="hidden" bind:value={instructions}></textarea>
            </label>
        </div>
    </div>
</form>