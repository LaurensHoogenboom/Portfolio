import { getUserCount, getUsers } from '$lib/server/db/cruds/users';
import { getTableColumns, isNotNull } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { users } from '$lib/server/db/schema/users';
import { getPortfolioItemCount, getPortfolioItems } from '$lib/server/db/cruds/portfolioItems';
import { portfolioItems } from '$lib/server/db/schema/portfolioItems';
import { getWorkspaces } from '$lib/server/db/cruds/workspaces';

export const load = (async () => {
    const [recentLogins, totalLoginCount, mostViewedPortfolioItems, totalPortfolioItemCount, workspaces] = await Promise.all([
        getUsers(7, 0, isNotNull(users.lastLogin), getTableColumns(users).lastLogin.name, "desc"),
        getUserCount(isNotNull(users.lastLogin)),
        getPortfolioItems(7, 0, undefined, "desc", getTableColumns(portfolioItems).clicks.name),
        getPortfolioItemCount(),
        getWorkspaces('all')
    ]);

    return {
        recentLogins: recentLogins,
        totalLoginCount: totalLoginCount,
        mostViewedPortfolioItems: mostViewedPortfolioItems,
        totalPortfolioItemCount: totalPortfolioItemCount,
        workspaces: workspaces
    };
}) satisfies PageServerLoad;