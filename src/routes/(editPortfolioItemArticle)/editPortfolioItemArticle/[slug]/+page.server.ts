import { getPortfolioItemById } from '$lib/server/db/cruds/portfolioItems';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { IPortfolioItem } from '$lib/types/portfolio';

export const load = (async ({ params }) => {
    const data = await getPortfolioItemById(params.slug);

    if (data) {
        return {
            portfolioItem: {
                id: data.id,
                type: data.type,
                title: data.title,
                description: data.description,
                image: data.upload?.image,
                articleContent: data.articleContent
            } as IPortfolioItem
        };
    } else {
        redirect(308, '/cms/portfolio');
    }
}) satisfies PageServerLoad;