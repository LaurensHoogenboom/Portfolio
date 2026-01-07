import { getPortfolioItemById } from '$lib/server/db/cruds/portfolioItems';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { IPortfolioItem } from '$lib/types/portfolio';

export const load = (async ({ params }) => {
    const portfolioItem = await getPortfolioItemById(params.slug);

    if (portfolioItem) {
        return { portfolioItem: portfolioItem as IPortfolioItem };
    } else {
        redirect(308, '/cms/portfolio');
    }
}) satisfies PageServerLoad;