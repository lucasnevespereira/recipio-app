<script lang="ts">
    import { onMount } from 'svelte';
    import {Icon, Share} from 'svelte-hero-icons';
    import {getImageURL} from "$lib/utils/image";

    export let data;

    // Set Open Graph meta tags dynamically
    onMount(() => {
        if (data.recipe) {
            const metaTags = [
                { property: 'og:title', content: data.recipe.title },
                { property: 'og:description', content: data.recipe.description },
                { property: 'og:image', content: data.recipe.photo },
                // Add more Open Graph meta tags as needed
            ];

            metaTags.forEach((meta) => {
                const tag = document.createElement('meta');
                tag.setAttribute('property', meta.property);
                tag.setAttribute('content', meta.content);
                document.head.appendChild(tag);
            });
        }
    });

    const shareViaWhatsApp = () => {
        const text = `${window.location.href}`;
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
        window.open(whatsappUrl, '_blank');
    };

    // const shareRecipe =  () => {
    //     console.log("sharing recipe")
    // };
</script>


{#if data.recipe}
    <div class="max-w-3xl mx-auto p-2 lg:p-8">
        <div class="flex justify-between items-center flex-col lg:flex-row mb-4">
            <h1 class="text-lg lg:text-xl font-bold">{data.recipe.title}</h1>
            <button class="hover:cursor-pointer flex items-center text-sm" on:click={shareViaWhatsApp}>
                <Icon src={Share} class="w-4 h-4 mr-2 text-500"/>
                Share to WhatsApp
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
