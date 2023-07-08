
import {redirect} from "@sveltejs/kit";
import {pb} from "$lib/pocketbase";
import type {LayoutServerLoad} from "../../../../.svelte-kit/types/src/routes/$types";

export const load: LayoutServerLoad = async ({params}) => {
    if (params.familySlug === undefined) {
        throw redirect(303, '/')
    }

    try {
        const res = await pb.collection('families').getFirstListItem(`slug="${params.familySlug}"`)
        const family = res.export()

        return {
            family: family
        }
    } catch (e) {
        console.error(e)
        throw redirect(303, '/')
    }

}