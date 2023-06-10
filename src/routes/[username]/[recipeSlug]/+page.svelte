<script lang="ts">
    import {Icon, Share} from 'svelte-hero-icons';
    import {getImageURL} from "$lib/utils/image";

    export let data;

    const shareRecipe =  () => {
        console.log("sharing recipe")
    };
</script>

{#if data.recipe}
    <div class="max-w-3xl mx-auto p-2 lg:p-8">
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-lg lg:text-xl font-bold">{data.recipe.title}</h1>
            <button class="hover:cursor-pointer" on:click={shareRecipe}>
                <Icon src={Share} class="w-6 h-6 mr-2 text-primary-500"/>
            </button>

        </div>
        <img class="w-full object-cover  h-auto max-h-[500px] rounded-lg mb-4 w-32"
             src={getImageURL(data.recipe?.collectionId, data.recipe?.id, data.recipe.photo)} alt={data.recipe.title}/>
        <p class="text-gray-500 mb-4">{data.recipe.description}</p>

        <h2 class="text-lg lg:text-xl font-bold mb-2">Ingredients</h2>
        <ul class="list-disc list-inside mb-4">
            {#each Object.entries(data.recipe.ingredients) as [key, ingredient]}
                <li>{ingredient}</li>
            {/each}
        </ul>

        <h2 class="text-lg lg:text-xl font-bold mb-2">Instructions</h2>
        <div class="mb-4 leading-relaxed">
            {@html data.recipe.instructions}
        </div>
    </div>
{/if}
