import {redirect} from "@sveltejs/kit";
import {pb} from "$lib/pocketbase";
import type {LayoutServerLoad} from "../../../.svelte-kit/types/src/routes/$types";

export const load: LayoutServerLoad = async ({params}) => {
    if (params.username === undefined) {
        throw redirect(303, '/')
    }

    try {
        const res = await pb.collection('users').getFirstListItem(`username="${params.username}"`)
        const user = structuredClone(res)
        const recipes = structuredClone(await pb.collection("recipes").getFullList({
            sort: '-created',
            filter: `user_id = "${user.id}" && private=false`
        }))

        return {
            user: user,
            recipes: recipes
        }
    } catch (e) {
        console.error(e)
        throw redirect(303, '/')
    }

}