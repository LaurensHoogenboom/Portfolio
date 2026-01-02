import { getPortfolioItems } from '$lib/server/db/cruds/portfolioItems';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const portfolioItems = await getPortfolioItems()

    return { portfolioItems: portfolioItems };
}) satisfies PageServerLoad;