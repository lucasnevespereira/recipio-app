import type {Actions} from './$types'

export const actions: Actions = {
    updateEmail: async ({locals, request}) => {
        const formData = Object.fromEntries(await request.formData()) as {
            newEmail: string
        }

        try {
            await locals.pb.collection('users').requestEmailChange(formData.newEmail);
            console.log("email sent")
            return {
                form: {updateEmailSuccess: true},
            };
        } catch (e) {
            console.error(e)
            return {
                form: {updateEmailError: true},
            };
        }
    }
}