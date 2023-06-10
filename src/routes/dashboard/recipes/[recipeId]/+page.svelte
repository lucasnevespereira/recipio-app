<script lang="ts">
    import {Icon, ArrowLeft} from 'svelte-hero-icons';
    import {getImageURL} from "$lib/utils/image";
    import {sendConfirmModal} from "$lib/utils/modal";
    import {sendToast} from "$lib/utils/toast";
    import {error, redirect} from "@sveltejs/kit";
    import {pb} from "$lib/pocketbase";

    export let data;


    const deleteRecipe = async () => {
        try {
            await pb.collection('recipes').delete(data.recipe.id);
        } catch (e) {
            console.error(e);
            throw error(e.status, e.message);
        }

        sendToast("Recipe deleted")
        window.location.href = '/dashboard/recipes'
    }
    const triggerDeleteRecipeModal = () => {
        sendConfirmModal('Delete Recipe', "Are you sure you want to delete this recipe?", deleteRecipe)
    }
</script>


{#if data.recipe}
    <div class="flex items-center justify-between">
        <a class="flex items-center" href="/dashboard/recipes">
            <Icon src={ArrowLeft} class="w-4 h-4"/>
            <span class="ml-1">
                Back to Recipes
            </span>
        </a>
        <div>
            <a href={`/dashboard/recipes/${data.recipe.id}/edit`} class="btn variant-ghost-secondary"> Edit Recipe </a>
            <button on:click={triggerDeleteRecipeModal} class="btn variant-ghost-error"> Delete Recipe</button>
        </div>

    </div>

    <h2 class="h2">{data.recipe.title}</h2>
    {#if data.recipe.photo}
        <img class="object-cover h-48 w-96 rounded"
             src={getImageURL(data.recipe?.collectionId, data.recipe?.id, data.recipe.photo)}
             alt={data.recipe.title}>
    {/if}
    <p>{data.recipe.description}</p>

    <h3 class="h3">Ingredients</h3>
    <nav class="list-nav">
        <ul>
            {#each Object.entries(data.recipe.ingredients) as [key, ingredient]}
                <li>{ingredient}</li>
            {/each}
        </ul>

    </nav>

    <h3 class="h3">Instructions</h3>
    {@html data.recipe.instructions}

{/if}