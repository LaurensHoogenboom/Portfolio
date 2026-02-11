import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getPortfolioItemById, updatePortfolioItem } from '$lib/server/db/cruds/portfolioItems';
import { cookieHelper } from '$lib/utils/cookieHelper';

export const POST: RequestHandler = async ({ params, cookies }) => {
    const portfolioItemId = params.slug;
    const viewedPortfolioItems = cookieHelper.getViewedPortfolioItems(cookies);

    if (viewedPortfolioItems.includes(portfolioItemId)) {
        return json({ message: 'Already counted.' }, { status: 200 });
    }

    try {
        const portfolioItemToUpdate = await getPortfolioItemById(params.slug);

        if (!portfolioItemToUpdate) {
            throw error(404, "Portfolio item not found.");
        }

        await updatePortfolioItem(portfolioItemId, { clicks: (portfolioItemToUpdate.clicks || 0) + 1 });

        cookieHelper.setViewedPortfolioItems(cookies, portfolioItemId);

        return json({ message: 'Success' }, { status: 201 });
    } catch (e) {
        console.log(e);
        throw error(500, 'Internal error while updating portfolio item stats.');
    }
};