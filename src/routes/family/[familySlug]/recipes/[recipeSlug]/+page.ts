import {redirect} from "@sveltejs/kit";
import {pb} from "$lib/pocketbase";
import type {
    PageLoad
} from "../../../../../../.svelte-kit/types/src/routes/family/[familySlug]/recipes/[recipeSlug]/$types";
export const load: PageLoad = async ({params}) => {
    if (params.recipeSlug === undefined) {
        throw redirect(303, `/family/${params.familySlug}`)
    }

    try {
        const recipe = structuredClone(await pb.collection('recipes').getFirstListItem(`slug="${params.recipeSlug}"`, {expand: "user_id"}));
        return {
            recipe: recipe
        }
    } catch (e) {
        console.error(e)
        throw redirect(303, `/family/${params.familySlug}`)
    }

}