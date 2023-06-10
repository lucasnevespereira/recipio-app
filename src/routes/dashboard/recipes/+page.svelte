<script lang="ts">
    import {pb, currentUser} from "$lib/pocketbase";
    import {onMount} from "svelte";
    import {Avatar} from "@skeletonlabs/skeleton";
    import {getImageURL} from "$lib/utils/image";

    let recipes = [];


    onMount(async () => {
        if ($currentUser) {
            recipes = await pb.collection('recipes').getFullList({
                sort: '-created',
                filter: `user_id = "${$currentUser.id}"`
            });
        }

        console.log(recipes)
    });
</script>

{#each recipes as recipe}
    <div class="card p-4 flex">
        <div class="mr-2">
            <Avatar src={recipe?.photo
					? getImageURL(recipe.collectionId, recipe.id, recipe.photo, '80x80')
					: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${recipe.title}`}
                    width="w-16"
                    rounded="rounded"/>
        </div>
        <div>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
        </div>
        <div></div>
    </div>
{/each}