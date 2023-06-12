<script lang="ts">
    import {page} from '$app/stores'
    import {Icon, Share} from 'svelte-hero-icons';
    import {getImageURL} from "$lib/utils/image";

    export let data;
    const {url} = $page;

    const shareViaWhatsApp = () => {
        const text = `${data.recipe.title} from Recipio - ${url}`;
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
        window.open(whatsappUrl, '_blank');
    };

    // const shareRecipe =  () => {
    //     console.log("sharing recipe")
    // };
</script>

<svelte:head>
    <title>{data.recipe.title}</title>
    <meta property="og:title" content={data.recipe.title}>
    <meta property="og:description" content={data.recipe.description}>
    <meta property="og:image" content={getImageURL(data.recipe?.collectionId, data.recipe?.id, data.recipe.photo)}>
    <meta property="og:url" content={url}>
    <meta property="og:site_name" content={data.recipe.title}>
    <meta property="og:image:secure_url"
          content={getImageURL(data.recipe?.collectionId, data.recipe?.id, data.recipe.photo)}>

    <meta property="whatsapp:title" content={data.recipe.title}>
    <meta property="whatsapp:description" content={data.recipe.description}>
    <meta property="whatsapp:image"
          content={getImageURL(data.recipe?.collectionId, data.recipe?.id, data.recipe.photo)}>
</svelte:head>


{#if data.recipe}
    <div class="max-w-3xl mx-auto p-2 lg:p-8 space-y-5">
        <div class="flex justify-between items-center flex-col lg:flex-row mb-5">
            <h2 class="h2 font-bold text-center mx-auto">{data.recipe.title}</h2>
        </div>
        <img class="w-full object-cover  h-auto max-h-[500px] rounded-lg mb-4"
             src={getImageURL(data.recipe?.collectionId, data.recipe?.id, data.recipe.photo)} alt={data.recipe.title}/>
        <p class="text-primary mb-4">{data.recipe.description}</p>

        <h3 class="text-lg lg:text-xl font-bold mb-2">Ingredients</h3>
        <ul class="list-disc list-inside mb-4">
            {#each Object.entries(data.recipe.ingredients) as [key, ingredient]}
                <li>{ingredient}</li>
            {/each}
        </ul>

        <h3 class="text-lg lg:text-xl font-bold mb-2">Instructions</h3>
        <div class="mb-4 leading-relaxed">
            {@html data.recipe.instructions}
        </div>

        <div class="w-full flex sm:justify-start lg:justify-end">
            <button class="hover:cursor-pointer flex items-center text-sm" on:click={shareViaWhatsApp}>
                <Icon src={Share} class="w-4 h-4 mr-2 text-500"/>
                Share to WhatsApp
            </button>
        </div>
    </div>
{/if}
