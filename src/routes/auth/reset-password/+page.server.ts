import type {Actions} from "@sveltejs/kit";
import {error} from "@sveltejs/kit";

export const actions: Actions = {
    resetPassword: async ({request, locals}) => {
        const body = Object.fromEntries(await request.formData()) as {
            email: string,
        };
        try {
            await locals.pb.collection('users').requestPasswordReset(body.email)
            return {
                success: true
            }
        } catch (e) {
            console.error(e);
            throw error(500, 'Something went wrong');
        }

    }
}