import {redirect} from "@sveltejs/kit";
import type {PageServerLoad} from "../../../../../.svelte-kit/types/src/routes/dashboard/recipes/[recipeId]/$types";

export const load: PageServerLoad = async ({locals, params}) => {

    console.log("params", params)

    if (params.recipeId === undefined) {
        throw redirect(303, '/dashboard/recipes')
    }
    const getRecipe = async (recipeId: string) => {
        try {
            console.log("params recipeID", recipeId)
            const recipe = await locals.pb.collection('recipes').getOne(recipeId)
            return structuredClone(recipe);
        } catch (e) {
            console.log("here")
            console.error(e)
            throw e
        }
    };

    return {
        recipe: getRecipe(params.recipeId)
    };
}