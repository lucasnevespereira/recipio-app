import type {PageServerLoad} from "../../../../.svelte-kit/types/src/routes/auth/login/$types";

export const load: PageServerLoad = async ({locals}) => {
    const getFamilies = async () => {
        try {
            return structuredClone(
                await locals.pb.collection("families").getFullList({
                    sort: '-created',
                    filter: `members ~ "${locals.user?.id}" || creator = "${locals.user?.id}"`,
                    expand: 'members, creator'
                })
            );
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    return {
        families: getFamilies(),
    };
}