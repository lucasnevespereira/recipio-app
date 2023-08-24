import {redirect} from "@sveltejs/kit";
import {pb} from "$lib/pocketbase";
import type {LayoutServerLoad} from "../../../../../../.svelte-kit/types/src/routes/family/[familySlug]/$types";

export const load: LayoutServerLoad = async ({params}) => {
    if (params.recipeSlug === undefined) {
        throw redirect(303, `/family/${params.familySlug}`)
    }

    try {
        const recipe = structuredClone(await pb.collection('recipes').getFirstListItem(`slug="${params.recipeSlug}"`, {}));
        return {
            recipe: recipe
        }
    } catch (e) {
        console.error(e)
        throw redirect(303, `/family/${params.familySlug}`)
    }

}