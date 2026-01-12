import type { LayoutServerLoad } from '../cms/$types';

export const load: LayoutServerLoad = (async ({ locals }) => {
    return { username: locals.username }
}) satisfies LayoutServerLoad;