
import {redirect} from "@sveltejs/kit";
import {pb} from "$lib/pocketbase";
import type {PageServerLoad} from "../../../../.svelte-kit/types/src/routes/[username]/[recipeSlug]/$types";
export const load: PageServerLoad = async ({params}) => {
    if (params.recipeSlug === undefined) {
        throw redirect(303, `/${params.username}`)
    }

    try {
        const recipe = structuredClone(await pb.collection('recipes').getFirstListItem(`slug="${params.recipeSlug}" && private=false`, {}));
        return {
            recipe: recipe
        }
    } catch (e) {
        console.error(e)
        throw redirect(303, `/${params.username}`)
    }

}