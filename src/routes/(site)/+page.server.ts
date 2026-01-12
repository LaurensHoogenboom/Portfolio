import { getPortfolioItems } from '$lib/server/db/cruds/portfolioItems';
import type { IPortfolioItem } from '$lib/types/portfolio';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const data = await getPortfolioItems();
    const portfolioItems = data.map(pItem => {
        return {
            id: pItem.id,
            type: pItem.type,
            title: pItem.title,
            description: pItem.description,
            image: pItem.upload?.image,
            articleContent: pItem.articleContent
        } as IPortfolioItem
    })

    return { portfolioItems: portfolioItems };
}) satisfies PageServerLoad;