import {redirect} from "@sveltejs/kit";
import type {
    PageServerLoad
} from "../../../../../../.svelte-kit/types/src/routes/dashboard/families/[familyId]/$types";


export const load: PageServerLoad = async ({locals, params}) => {
    if (params.familyId === undefined) {
        throw redirect(303, '/dashboard/families')
    }
    const getFamily = async (familyId: string) => {
        try {
            const recipe = await locals.pb.collection('families').getOne(familyId);
            return structuredClone(recipe)
        } catch (e) {
            console.log(e)
            throw e
        }
    };

    return {
        family: getFamily(params.familyId)
    };
}
