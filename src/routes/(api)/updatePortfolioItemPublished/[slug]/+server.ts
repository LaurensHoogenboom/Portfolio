import { updatePortfolioItem } from '$lib/server/db/cruds/portfolioItems';
import type { IPortfolioItem } from '$lib/types/portfolio';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, params }) => {
    const portfolioItemId = params.slug;
    const { published } = await request.json();

    try {
        const portfolioItem = await updatePortfolioItem(portfolioItemId, { published: published });
        return json({
            portfolioItem: {
                ...portfolioItem,
                image: portfolioItem?.upload?.image
            } as IPortfolioItem
        }, { status: 201 })
    } catch (e) {
        console.log(e);
        throw error(403, 'Could not save portfolio item article content.');
    }
};