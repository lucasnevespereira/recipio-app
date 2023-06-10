<script lang="ts">
    import {Icon, ArrowLeft} from 'svelte-hero-icons';
    import {getImageURL} from "$lib/utils/image";

    export let data;
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
            <a href="/dashboard/recipes/new" class="btn variant-ghost-secondary"> Edit Recipe </a>
            <a href="/dashboard/recipes/new" class="btn variant-ghost-error"> Delete Recipe </a>
        </div>

    </div>

    <h2 class="h2">{data.recipe.title}</h2>
    <img class="object-cover h-48 w-96 rounded" src={getImageURL(data.recipe?.collectionId, data.recipe?.id, data.recipe.photo)} alt="">
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