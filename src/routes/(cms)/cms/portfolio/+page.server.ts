import { createPortfolioItem, deletePortfolioItem, getPortfolioItemById, getPortfolioItemCount, getPortfolioItems, updatePortfolioItem } from '$lib/server/db/cruds/portfolioItems';
import { portfolioItems as portfolioItemTable } from '$lib/server/db/schema/portfolioItems';
import { isPortfolioItemType, type PortfolioItemType } from '$lib/types/portfolio';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { uploadImage } from '$lib/utils/uploads/image/uploadImage';
import { deleteFileAndUpload } from '$lib/utils/uploads/delete';
import { and, eq } from 'drizzle-orm';
import { getPagingAndSortingParams } from '../shared/getPaginationAndSortingParams';

export const load = (async ({ url }) => {
    const { pageIndex, itemsPerPage, sortBy, sortDirection } = getPagingAndSortingParams(url);
    const category = url.searchParams.get('category');

    const filters = [
        category && isPortfolioItemType(category) ? eq(portfolioItemTable.type, category) : undefined
    ].filter(Boolean);

    const where = filters.length > 0 ? and(...filters) : undefined;

    const [portfolioItems, portfolioItemCount] = await Promise.all([
        getPortfolioItems(itemsPerPage, pageIndex * itemsPerPage, where, sortDirection, sortBy),
        getPortfolioItemCount(where)
    ]);

    return { portfolioItems: portfolioItems, portfolioItemCount: portfolioItemCount?.count ?? 0 };
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        const imageFile = formData.get('image') as File | null;

        const data: typeof portfolioItemTable.$inferInsert = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            type: formData.get('type') as PortfolioItemType,
            visiblePriority: parseInt(formData.get('visiblePriority') as string) || 0,
            isArticle: formData.has('isArticle')
        }

        if (imageFile && imageFile.size > 0 && data.title) {
            try {
                const image = imageFile && imageFile.size > 0 ? await uploadImage(imageFile, data.title) : undefined;
                data.imageUploadId = image?.id;
            } catch (e) {
                console.log(e);
                return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
            }
        }

        try {
            const newPortfolioItem = await createPortfolioItem(data);

            return {
                portfolioItemId: newPortfolioItem?.id,
                portfolioItemTitle: newPortfolioItem?.title,
            }
        } catch (e) {
            console.log(e);
            return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
        }
    },
    update: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id') as string;
        const imageFile = formData.get('image') as File | null;

        const updateData: Partial<typeof portfolioItemTable.$inferInsert> = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            type: formData.get('type') as PortfolioItemType,
            visiblePriority: parseInt(formData.get('visiblePriority') as string) || 0,
            isArticle: formData.has('isArticle')
        }

        if (imageFile && imageFile.size > 0 && updateData.title) {
            try {
                const portfolioItem = await getPortfolioItemById(id);
                if (portfolioItem && portfolioItem.upload) {
                    await deleteFileAndUpload(portfolioItem.upload);
                };
                updateData.imageUploadId = (await uploadImage(imageFile, updateData.title)).id;
            } catch (e) {
                console.log(e);
                return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
            }
        };

        try {
            const updatedPortfolioItem = await updatePortfolioItem(id, updateData);

            return {
                portfolioItemId: updatedPortfolioItem?.id,
                portfolioItemTitle: updatedPortfolioItem?.title,
            }
        } catch (e) {
            console.log(e);
            return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
        }
    },
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id') as string;

        try {
            const portfolioItem = await getPortfolioItemById(id);

            if (portfolioItem && portfolioItem.upload) {
                await deleteFileAndUpload(portfolioItem.upload);
            };

            await deletePortfolioItem(id);

            return {
                itemName: portfolioItem?.title,
            }
        } catch (e) {
            console.log(e);
            return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
        }
    }
}