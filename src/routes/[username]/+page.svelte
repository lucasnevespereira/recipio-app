<script>
    import {getImageURL} from "$lib/utils/image";
    import {goto} from "$app/navigation";
    import {page} from "$app/stores";
    import ViewModeToggle from "$lib/components/ViewModeToggle.svelte";
    import {onMount} from "svelte";
    import RecipeCard from "$lib/components/RecipeCard.svelte";

    const {url} = $page;
    export let data;
    let viewMode = "gallery";
    onMount(() => {
        viewMode = localStorage.getItem('viewMode') || "gallery";
    });
</script>

<svelte:head>
    <title>{`${data.user.username} - Recipio`}</title>
    <meta property="og:title" content={`${data.user.username}`}>
    <meta property="og:description" content={`Recipio profile of ${data.user.username}`}>
    <meta property="og:image" content={getImageURL(data.user?.collectionId, data.user?.id, data.user.avatar)}>
    <meta property="og:url" content={url}>
    <meta property="og:site_name" content={data.user.username}>
    <meta property="og:image:secure_url"
          content={getImageURL(data.user?.collectionId, data.user?.id, data.user.avatar)}>

    <meta property="whatsapp:title" content={data.user.username}>
    <meta property="whatsapp:description" content={`Recipio profile of ${data.user.username}`}>
    <meta property="whatsapp:image"
          content={getImageURL(data.user?.collectionId, data.user?.id, data.user.avatar)}>
</svelte:head>

{#if data.recipes.length === 0}
    <p class="card text-center max-w-md mx-auto p-2">No recipes available yet!</p>
{:else}
    <ViewModeToggle bind:viewMode={viewMode}/>
    {#if viewMode === 'gallery'}
        <div class="max-w-[900px] mx-auto grid grid-auto-rows grid-auto-cols sm:grid-cols-1 lg:grid-cols-3 gap-4 place-items-center mb-5">
            {#each data.recipes as recipe (recipe.id)}
                <RecipeCard
                        recipe={recipe}
                        view="gallery"
                        url={`/${data.user.username}/${recipe.slug}`}/>
            {/each}
        </div>
    {/if}

    {#if viewMode === 'list'}
        <div class="max-w-[900px] mx-auto">
            {#if data.recipes.length === 0}
                <p class="text-center text-xl">No recipes available yet!</p>
            {/if}
            {#each data.recipes as recipe (recipe.id)}
                <RecipeCard
                        recipe={recipe}
                        view="list"
                        url={`/${data.user.username}/${recipe.slug}`}/>
            {/each}
        </div>
    {/if}
{/if}


