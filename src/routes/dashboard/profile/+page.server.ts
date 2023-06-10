import type {Actions} from "@sveltejs/kit";
import {error} from "@sveltejs/kit";

export const actions: Actions = {
    updateProfile: async ({request, locals}) => {
        const data = await request.formData()
        const userAvatar = data.get('avatar') as File

        if (userAvatar.size === 0) {
            data.delete('avatar');
        }

        try {
            if (locals?.user == undefined) {
                return new Error('user id is undefined')
            }
            const {name, avatar} = await locals.pb.collection('users').update(locals.user.id, data)

            locals.user.name = name
            locals.user.avatar = avatar

        } catch (e) {
            console.error(e);
            throw error(400, 'Something went wrong when updating your profile');
        }

        return {
            success: true
        }
    }
}