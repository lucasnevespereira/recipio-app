<script>
    import {onMount} from "svelte";
    import ViewModeToggle from "$lib/components/ViewModeToggle.svelte";
    import RecipeCard from "$lib/components/RecipeCard.svelte";
    import {page} from "$app/stores";

    export let data;
    let viewMode;
    onMount(() => {
        if (typeof window !== 'undefined') {
            viewMode = localStorage.getItem('viewMode') || "gallery";
        }
    });

    const {url} = $page;

</script>

<svelte:head>
    <title>{data.family.name} - Recipio</title>
    <meta property="og:title" content={data.family.name}>
    <meta property="og:url" content={url}>
    <meta property="whatsapp:title" content={data.family.name}>
</svelte:head>

<div class="mt-24 sm:mt-20 mb-10 px-4 z-10">
    {#if data.recipes.length === 0}
        <p class="card text-center max-w-md mx-auto p-2">No recipes available yet!</p>
    {:else}
        <ViewModeToggle bind:viewMode={viewMode}/>
        {#if viewMode === 'gallery'}
            <div class="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
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
