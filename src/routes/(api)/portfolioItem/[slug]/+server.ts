import { getPortfolioItemById } from '$lib/server/db/cruds/portfolioItems';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { IPortfolioItem } from '$lib/types/portfolio';

export const GET: RequestHandler = async ({ params }) => {
    try {
        const data = await getPortfolioItemById(params.slug);

        if (data) {
            const portfolioItem = {
                id: data.id,
                type: data.type,
                title: data.title,
                description: data.description,
                image: data.upload?.image,
                articleContent: data.articleContent
            } as IPortfolioItem;

            return json(portfolioItem);
        } else {
            throw error(404, 'Portfolio item not found');
        }
    } catch (e) {
        console.log(e);
        throw error(404, 'Portfolio item not found.');
    }
};