import {redirect, fail, error} from '@sveltejs/kit'
import type {Actions} from './$types'
import {registerUserSchema, validateData} from "$lib/schemas";

export const actions: Actions = {
    register: async ({locals, request}) => {
        const {formData, errors} = await validateData(await request.formData(), registerUserSchema);
        if (errors) {
            console.log(errors)
            return fail(400, {
                data: formData,
                errors: errors.fieldErrors
            });
        }

        try {
            formData.emailVisibility = true;
            await locals.pb.collection('users').create(formData)
            await locals.pb.collection('users').requestVerification(formData.email)
            await locals.pb
                .collection('users')
                .authWithPassword(formData.email, formData.password)
        } catch (e: any) {
            console.error(e)
            throw error(e.status, e.message);
        }

        throw redirect(303, '/dashboard')
    },
}