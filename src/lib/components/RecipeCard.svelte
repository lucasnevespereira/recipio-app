<script>
    import {goto} from "$app/navigation";
    import {getImageURL} from "$lib/utils/image";

    export let recipe;
    export let view = 'gallery'; // Default view

    // The URL prop allows you to set a custom URL for the RecipeCard
    export let url = "";

    function navigate() {
        if (url) {
            goto(url);
        } else {
            console.error("No URL provided to RecipeCard!");
        }
    }
</script>

<div on:click={navigate}>
    {#if view === 'gallery'}
        <div class="relative card card-hover hover:cursor-pointer w-64 sm:max-w-md md:max-w-lg">
            <img class="w-64 h-64 object-cover rounded-lg"
                 src={getImageURL(recipe?.collectionId, recipe?.id, recipe.photo)} alt={recipe.title}/>
            <div class="absolute bottom-0 left-0 w-full bg-white bg-opacity-90 rounded-b-lg p-2">
                <p class="text-primary-90 text-center text-sm font-bold">{recipe.title}</p>
            </div>
        </div>
    {:else if view === 'list'}
        <div class="card card-hover hover:cursor-pointer p-2 flex items-center mb-4">
            <img class="w-16 h-16 object-cover rounded-lg mr-4"
                 src={getImageURL(recipe?.collectionId, recipe?.id, recipe.photo)} alt={recipe.title}/>
            <p class="text-primary-90 text-md font-bold">{recipe.title}</p>
        </div>
    {/if}
</div>
