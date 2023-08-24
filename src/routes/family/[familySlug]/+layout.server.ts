
import {redirect} from "@sveltejs/kit";
import {pb} from "$lib/pocketbase";
import type {LayoutServerLoad} from "../../../../.svelte-kit/types/src/routes/$types";

export const load: LayoutServerLoad = async ({params}) => {
    if (params.familySlug === undefined) {
        throw redirect(303, '/')
    }

    try {
        const familyRes = await pb.collection('families').getFirstListItem(`slug="${params.familySlug}"`)
        const family = familyRes.export()

        const recipes = await pb.collection('recipes').getFullList({
            sort: '-created',
            filter: `families ~ "${family.id}"`,
        });
        return {
            family: family,
            recipes: structuredClone(recipes)
        }
    } catch (e) {
        console.error(e)
        throw redirect(303, '/')
    }

}