import type {LayoutServerLoad} from "../../../.svelte-kit/types/src/routes/$types";
import {redirect} from "@sveltejs/kit";
import {pb} from "$lib/pocketbase";

export const load: LayoutServerLoad = async ({params}) => {
    if (params.username === undefined) {
        throw redirect(303, '/')
    }

    try {
        const res = await pb.collection('users').getFirstListItem(`username="${params.username}"`)
        return {
            user: res.export()
        }
    } catch (e) {
        console.error(e)
        throw redirect(303, '/')
    }

}