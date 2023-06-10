import type {PageServerLoad} from "../../../../.svelte-kit/types/src/routes/auth/login/$types";


export const load: PageServerLoad = async ({locals}) => {
    const getRecipes = async () => {
        try {
            return structuredClone(
                await locals.pb.collection("recipes").getFullList({
                    sort: '-created',
                    filter: `user_id = "${locals.user?.id}"`
                })
            );
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    return {
        recipes: getRecipes(),
    };
}