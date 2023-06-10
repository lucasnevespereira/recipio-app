import {redirect} from "@sveltejs/kit";
import type {LayoutServerLoad} from "../../../../../../.svelte-kit/types/src/routes/dashboard/$types";


export const load: LayoutServerLoad = async ({locals, params}) => {
    if (params.recipeId === undefined) {
        throw redirect(303, '/dashboard/recipes')
    }
    const getRecipe = async (recipeId: string) => {
        console.log("here", recipeId)
        try {
            const recipe = await locals.pb.collection('recipes').getOne(recipeId);
            console.log("here too", recipe)
            return structuredClone(recipe)
        } catch (e) {
            console.log(e)
            throw e
        }
    };

    return {
        recipe: getRecipe(params.recipeId)
    };
}
