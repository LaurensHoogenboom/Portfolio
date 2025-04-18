import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { login } from './helpers/authentication';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const formData = Object.fromEntries(await request.formData());
        const { username, password } = formData as {
            username: string,
            password: string
        }

        try {
            const user = await login(username, password);

            cookies.set("userId", `${user.userId}`, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24,
                secure: true
            });

            return {
                success: true
            };
        } catch (e) {
            const error = e as Error;
            console.log(error);
            return fail(422, { error: error.message });
        }
    },

    logout: async ({ cookies }) => {
        cookies.delete('userid', { path: '/' });
        throw redirect(303, '/');
    }
} satisfies Actions;