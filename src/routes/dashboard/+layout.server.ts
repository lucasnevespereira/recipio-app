import type {LayoutServerLoad} from "../../../.svelte-kit/types/src/routes/$types";
import {redirect} from "@sveltejs/kit";


export const load: LayoutServerLoad = async ({locals}) => {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/auth/login');
    }

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

    const getFamilies = async () => {
        try {
            return structuredClone(
                await locals.pb.collection("families").getFullList({
                    sort: '-created',
                    filter: `members ~ "${locals.user?.id}" || creator = "${locals.user?.id}"`,
                    expand: 'members, creator'
                })
            );
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    return {
        recipes: getRecipes(),
        families: getFamilies()
    };
}