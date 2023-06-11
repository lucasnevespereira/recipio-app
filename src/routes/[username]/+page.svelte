<script>
    import {getImageURL} from "$lib/utils/image";
    import {goto} from "$app/navigation";

    export let data;
</script>


<div class="grid auto-cols-auto auto-rows-auto gap-4 place-items-center">
    {#each data.recipes as recipe (recipe.id)}
        <div class="relative card card-hover hover:cursor-pointer w-64 sm:max-w-md md:max-w-lg" on:click={goto(`/${data.user.username}/${recipe.slug}`)}>
            <img class="w-full h-auto rounded-lg" src={getImageURL(recipe?.collectionId, recipe?.id, recipe.photo)} alt={recipe.title}/>
            <div class="absolute bottom-0 left-0 w-full bg-primary-100 bg-opacity-50 rounded-b-lg p-2">
                <p class="text-primary text-center text-md font-bold">{recipe.title}</p>
            </div>
        </div>
    {/each}
</div>

