import type {LayoutServerLoad} from "../../../../../.svelte-kit/types/src/routes/$types";
import {redirect} from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({locals, params}) => {

    if (params.recipeId === undefined) {
        throw redirect(303, '/dashboard/recipes')
    }
    const getRecipe = async (recipeId: string) => {
        try {
            return structuredClone(await locals.pb.collection('recipes').getOne(recipeId));
        } catch (e) {
            console.log(e)
            throw e
        }
    };

    return {
        recipe: getRecipe(params.recipeId)
    };
}