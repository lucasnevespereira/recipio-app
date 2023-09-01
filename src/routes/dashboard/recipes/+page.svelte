<script lang="ts">
    import {Avatar} from "@skeletonlabs/skeleton";
    import {getImageURL} from "$lib/utils/image";
    import {goto} from "$app/navigation";

    export let data;
</script>

<div class="flex items-center justify-between">
    <h2>
        <a href="/dashboard/recipes">
            <h3 class="h3 font-bold">Recipes</h3>
        </a>
    </h2>
    {#if data.recipes.length > 0}
        <a href="/dashboard/recipes/new" class="btn variant-ghost"> New Recipe </a>
    {/if}
</div>

{#if data.recipes.length === 0}
    <div class="mt-10 p-6 border rounded-md text-center">
        <p class="text-xl font-semibold mb-4">It looks like you have no recipes.</p>
        <a href="/dashboard/recipes/new" class="mt-6 btn variant-ghost-primary">Create your first recipe</a>
    </div>
{/if}


{#each data.recipes as recipe}
    <div class="card p-4 flex hover:cursor-pointer items-center relative"
         on:click={goto(`/dashboard/recipes/${recipe.id}`)}>
        {#if recipe.private}
            <span class="absolute top-0 right-0 bg-secondary-500 text-white text-xs p-1 rounded-bl-md">private</span>
        {/if}
        <div class="mr-2">
            {#if recipe.photo}
                <Avatar src={getImageURL(recipe.collectionId, recipe.id, recipe.photo, '80x80')}
                        width="w-16"
                        rounded="rounded"/>
            {:else }
                <div class="placeholder-circle w-16 rounded"></div>
            {/if}
        </div>
        <div>
            <h5 class="h5 font-bold flex items-center">{recipe.title}</h5>
            <p class="description">{recipe.description}</p>
        </div>
        <div>
        </div>
    </div>
{/each}


<style>
    @media only screen and (max-width: 1024px) {
        .description {
            display: none;
        }
    }
</style>