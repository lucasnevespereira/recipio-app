<script>
    import {onMount} from "svelte";
    import ViewModeToggle from "$lib/components/ViewModeToggle.svelte";
    import RecipeCard from "$lib/components/RecipeCard.svelte";

    export let data;
    let viewMode = "gallery";
    onMount(() => {
        viewMode = localStorage.getItem('viewMode') || "gallery";
    });

</script>

<div class="mt-24 sm:mt-20 mb-10 px-4 z-10">
    {#if data.recipes.length === 0}
        <p class="card text-center max-w-md mx-auto p-2">No recipes available yet!</p>
    {:else}
        <ViewModeToggle bind:viewMode={viewMode}/>
        {#if viewMode === 'gallery'}
            <div class="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-start">
                {#each data.recipes as recipe (recipe.id)}
                    <RecipeCard
                            recipe={recipe}
                            view="gallery"
                            url={`/family/${data.family.slug}/recipes/${recipe.slug}`}/>
                {/each}
            </div>
        {/if}
        {#if viewMode === 'list'}
            <div class="max-w-[900px] mx-auto">
                {#each data.recipes as recipe (recipe.id)}
                    <RecipeCard
                            recipe={recipe}
                            view="list"
                            url={`/family/${data.family.slug}/recipes/${recipe.slug}`}/>
                {/each}
            </div>
        {/if}
    {/if}

</div>
