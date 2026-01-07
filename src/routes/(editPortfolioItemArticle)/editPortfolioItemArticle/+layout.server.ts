import { getUserById } from '$lib/server/db/cruds/users';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
    const userId = cookies.get('userId');
    
    if (userId) {
        const user = await getUserById(userId);

        if (user) {
            return { username: user.username };
        }
    } else {
        redirect(308, "/login");
    }
}) satisfies LayoutServerLoad;