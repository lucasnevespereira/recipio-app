
import {redirect} from "@sveltejs/kit";
import {pb} from "$lib/pocketbase";
import type {LayoutServerLoad} from "../../../../.svelte-kit/types/src/routes/$types";

export const load: LayoutServerLoad = async ({params}) => {
    if (params.recipeSlug === undefined) {
        throw redirect(303, `/${params.username}`)
    }

    try {
        console.log(params.recipeSlug)
        const recipe = structuredClone(await pb.collection('recipes').getFirstListItem(`slug="${params.recipeSlug}"`, {}));
        console.log(recipe)

        return {
            recipe: recipe
        }
    } catch (e) {
        console.error(e)
        throw redirect(303, `/${params.username}`)
    }

}