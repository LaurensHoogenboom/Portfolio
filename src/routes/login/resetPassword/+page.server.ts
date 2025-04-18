import { getUserByUsername } from '$lib/server/db/cruds/users';
import { resetPassword } from '../helpers/authentication';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { sha256 } from '@oslojs/crypto/sha2';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    getSecurityQuestion: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        const { username } = formData as { username: string };
        
        try {
            const user = await getUserByUsername(username);

            return {
                success: true,
                userId: user?.id,
                username: user?.username,
                securityQuestion: user?.securityQuestion
            };
        } catch (e) {
            const error = e as Error;
            console.log(error);
            return fail(422, { error: error.message });
        }
    },

    resetPassword: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        const { id, securityQuestionAnswer, newPassword } = formData as { 
            id: string,
            securityQuestionAnswer: string,
            newPassword: string
        }

        try {
            await resetPassword(id, sha256(Buffer.from(newPassword)), securityQuestionAnswer);

            return {
                success: true
            }
        } catch (e) {
            const error = e as Error;
            console.log(error);
            return fail(422, { error: error.message });
        }
    }
} satisfies Actions