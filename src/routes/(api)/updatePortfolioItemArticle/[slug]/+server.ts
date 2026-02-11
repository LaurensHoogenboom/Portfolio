import type { OutputData } from '@editorjs/editorjs';
import { updatePortfolioItem } from '$lib/server/db/cruds/portfolioItems';
import { error } from 'node:console';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, params }) => {
    const portfolioItemId = params.slug;
    const { articleContent } = await request.json();

    try {
        const portfolioItem = await updatePortfolioItem(portfolioItemId, { articleContent: articleContent as OutputData });
        return json({ portfolioItem: portfolioItem }, { status: 201 });
    } catch (e) {
        console.log(e);
        throw error(403, 'Could not save portfolio item article content.');
    }
}