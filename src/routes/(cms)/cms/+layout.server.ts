import { getWorkspaces } from '$lib/server/db/cruds/workspaces';
import { eq } from 'drizzle-orm';
import type { LayoutServerLoad } from '../cms/$types';
import { workspaces } from '$lib/server/db/schema/workspaces';

export const load: LayoutServerLoad = (async ({ locals }) => {
    const adminWorkspaceFilter = locals.userType == 'default' ? [eq(workspaces.adminRequired, false)] : []
    const userWorkspaces = await getWorkspaces('all', undefined, ...adminWorkspaceFilter);

    return {
        username: locals.username,
        userId: locals.userId,
        userType: locals.userType,
        adminCount: locals.adminCount,
        preferredWorkspaceId: locals.preferredWorkspaceId,
        userWorkspaces: userWorkspaces
    }
}) satisfies LayoutServerLoad;