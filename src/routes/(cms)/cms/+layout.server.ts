import type { LayoutServerLoad } from '../cms/$types';

export const load: LayoutServerLoad = (async ({ locals }) => {
    return {
        username: locals.username,
        userId: locals.userId,
        userType: locals.userType,
        adminCount: locals.adminCount
    }
}) satisfies LayoutServerLoad;