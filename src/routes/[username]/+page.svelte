<!--<style>-->
<!--    .profile-container {-->
<!--        display: flex;-->
<!--        flex-direction: column;-->
<!--        align-items: center;-->
<!--        padding-top: 40px;-->
<!--        text-align: center;-->
<!--    }-->

<!--    .avatar {-->
<!--        width: 120px;-->
<!--        height: 120px;-->
<!--        border-radius: 50%;-->
<!--        overflow: hidden;-->
<!--        margin-bottom: 20px;-->
<!--    }-->

<!--    .avatar img {-->
<!--        width: 100%;-->
<!--        height: 100%;-->
<!--        object-fit: cover;-->
<!--    }-->

<!--    .profile-name {-->
<!--        font-size: 24px;-->
<!--        font-weight: bold;-->
<!--        margin-bottom: 8px;-->
<!--    }-->

<!--    .profile-username {-->
<!--        font-size: 18px;-->
<!--        color: #888;-->
<!--    }-->

<!--    .recipe-gallery {-->
<!--        display: grid;-->
<!--        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));-->
<!--        grid-gap: 20px;-->
<!--        justify-items: center;-->
<!--    }-->

<!--    .recipe-card {-->
<!--        width: 200px;-->
<!--        height: 200px;-->
<!--        background-color: #f3f3f3;-->
<!--        display: flex;-->
<!--        justify-content: center;-->
<!--        align-items: center;-->
<!--        border-radius: 8px;-->
<!--        cursor: pointer;-->
<!--        transition: transform 0.2s ease;-->
<!--    }-->

<!--    .recipe-card:hover {-->
<!--        transform: scale(1.05);-->
<!--    }-->

<!--    .recipe-card img {-->
<!--        max-width: 100%;-->
<!--        max-height: 100%;-->
<!--        object-fit: cover;-->
<!--        border-radius: 8px;-->
<!--    }-->

<!--    .recipe-name {-->
<!--        margin-top: 8px;-->
<!--        font-size: 16px;-->
<!--        text-align: center;-->
<!--    }-->
<!--</style>-->

<script>
    import {getImageURL} from "$lib/utils/image";
    import {goto} from "$app/navigation";

    export let data;
</script>


<div class="grid auto-cols-auto auto-rows-auto gap-4 place-items-center">
    {#each data.recipes as recipe (recipe.id)}
        <div class="relative hover:cursor-pointer w-64 sm:max-w-md md:max-w-lg"
             on:click={goto(`/${data.user.username}/${recipe.slug}`)}>
            <img class="w-full h-auto rounded-lg" src={getImageURL(recipe?.collectionId, recipe?.id, recipe.photo)}
                 alt={recipe.title}/>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-lg">
                <p class="text-white text-center text-md md:text-md lg:text-lg font-bold">{recipe.title}</p>
            </div>
        </div>
    {/each}
</div>

