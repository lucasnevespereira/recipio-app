<script>
    import {getImageURL} from "$lib/utils/image";
    import {goto} from "$app/navigation";
    import {page} from "$app/stores";

    const {url} = $page;

    export let data;
</script>


<svelte:head>
    <title>{`Recipio ${data.user.username}`}</title>
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


<div class="max-w-[900px] mx-auto grid grid-auto-rows grid-auto-cols sm:grid-cols-1 lg:grid-cols-3 gap-4 place-items-center">
    {#each data.recipes as recipe (recipe.id)}
        <div class="relative card card-hover hover:cursor-pointer w-64 sm:max-w-md md:max-w-lg" on:click={goto(`/${data.user.username}/${recipe.slug}`)}>
            <img class="w-64 h-64 object-cover rounded-lg" src={getImageURL(recipe?.collectionId, recipe?.id, recipe.photo)} alt={recipe.title}/>
            <div class="absolute bottom-0 left-0 w-full bg-primary-100 bg-opacity-50 rounded-b-lg p-2">
                <p class="text-primary text-center text-sm font-bold">{recipe.title}</p>
            </div>
        </div>
    {/each}
</div>

