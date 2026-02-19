import { getWorkspaces } from '$lib/server/db/cruds/workspaces';
import { eq } from 'drizzle-orm';
import type { LayoutServerLoad } from '../cms/$types';
import { workspaces } from '$lib/server/db/schema/workspaces';

export const load: LayoutServerLoad = (async ({ locals }) => {
    const adminWorkspaceFilter = locals.currentUser.type == 'default' ? [eq(workspaces.adminRequired, false)] : []
    const userWorkspaces = await getWorkspaces('all', undefined, ...adminWorkspaceFilter);

    return {
        currentUser: locals.currentUser,
        userWorkspaces: userWorkspaces
    }
}) satisfies LayoutServerLoad;