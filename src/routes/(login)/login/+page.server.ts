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
            console.log(e);
            return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
        }
    },

    logout: async ({ cookies }) => {
        cookies.delete('userId', { path: '/' });
        throw redirect(303, '/');
    }
} satisfies Actions;