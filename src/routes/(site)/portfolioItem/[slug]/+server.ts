import { getPortfolioItemById } from '$lib/server/db/cruds/portfolioItems';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
    try {
        const portfolioItem  = await getPortfolioItemById(params.slug);
        return json(portfolioItem);
    } catch (e) {
        console.log(e);
        throw error(404, 'Portfolio item not found.');
    }
};