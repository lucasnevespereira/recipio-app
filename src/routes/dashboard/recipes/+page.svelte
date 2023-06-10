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
    <a href="/dashboard/recipes/new" class="btn variant-ghost-primary"> New Recipe </a>
</div>

{#each data.recipes as recipe}
    <div class="card p-4 flex hover:cursor-pointer" on:click={goto(`/dashboard/recipes/${recipe.id}`)}>
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
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
        </div>
        <div></div>
    </div>
{/each}