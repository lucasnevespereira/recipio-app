import type {LayoutServerLoad} from "../../../.svelte-kit/types/src/routes/$types";
import {redirect} from "@sveltejs/kit";


export const load: LayoutServerLoad = async ({ locals }) => {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/auth/login');
    }
}