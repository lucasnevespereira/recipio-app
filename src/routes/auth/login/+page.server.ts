import {error, redirect, fail} from '@sveltejs/kit'
import type {Actions} from './$types'

export const actions: Actions = {
    login: async ({locals, request}) => {
        const data = Object.fromEntries(await request.formData()) as {
            username: string
            password: string
        }

        if (!data.password || !data.username) {
            return fail(400, {
                data: data
            });
        }

        try {
            await locals.pb
                .collection('users')
                .authWithPassword(data.username, data.password)
        } catch (e: any) {
            console.error(e)
            throw error(e.status, e.message);
        }

        throw redirect(303, '/dashboard')
    },
}