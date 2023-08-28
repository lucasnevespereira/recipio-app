<script lang="ts">
    import {page} from '$app/stores'
    import {Icon, Share} from 'svelte-hero-icons';
    import {getImageURL} from "$lib/utils/image";
    import DynamicHTML from "$lib/components/DynamicHTML.svelte";

    export let data;
    const {url} = $page;

    const shareViaWhatsApp = () => {
        const text = `${data.recipe.title} from Recipio - ${url}`;
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
        window.open(whatsappUrl, '_blank');
    };
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

        <!-- Enhanced Header Section -->
        <div class="flex flex-col lg:flex-row justify-center lg:justify-between items-center mb-6 space-y-4 lg:space-y-0">

            <!-- Left: Title and Author -->
            <div class="flex flex-col space-y-2 mb-4 lg:mb-0 text-center lg:text-left">
                <!-- Recipe Title -->
                <h2 class="h2 font-semibold break-words">{data.recipe.title}</h2>

                <!-- Recipe Author -->
                {#if data.family.show_authors}
                    <div class="flex items-center justify-center lg:justify-start">
                        <span class="text-sm text-gray-600">Recipe by </span>
                        <a href={`/${data.recipe.expand.user_id.username}`}
                           class="ml-2 font-medium hover:cursor-pointer">{data.recipe.expand.user_id.username}</a>
                    </div>
                {/if}
            </div>

            <!-- Right: Share Button -->
            <div class="flex-shrink-0 space-y-2">
                <button class="hover:cursor-pointer flex items-center text-sm py-1 px-3 rounded-md"
                        on:click={shareViaWhatsApp}>
                    <Icon src={Share} class="w-4 h-4 mr-2 text-500"/>
                    Share to WhatsApp
                </button>
            </div>
        </div>

        <!-- Recipe Image -->
        <img class="w-full object-cover h-auto max-h-[500px] rounded-lg mb-4"
             src={getImageURL(data.recipe?.collectionId, data.recipe?.id, data.recipe.photo)} alt={data.recipe.title}/>

        <!-- Recipe Description -->
        <p class="text-primary mb-4">{data.recipe.description}</p>

        <!-- Ingredients -->
        <h3 class="text-lg lg:text-xl font-bold mb-2">Ingredients</h3>
        <ul class="list-disc list-inside mb-4">
            {#each Object.entries(data.recipe.ingredients) as [key, ingredient]}
                <li>{ingredient}</li>
            {/each}
        </ul>

        <!-- Instructions -->
        <h3 class="text-lg lg:text-xl font-bold mb-2">Instructions</h3>
        <div class="mb-4 leading-relaxed">
            <DynamicHTML htmlContent={data.recipe.instructions}/>
        </div>
    </div>
{/if}




