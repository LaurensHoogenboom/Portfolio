import { createPortfolioItem, deletePortfolioItem, getPortfolioItemById, getPortfolioItemCount, getPortfolioItems, updatePortfolioItem } from '$lib/server/db/cruds/portfolioItems';
import { portfolioItems as portfolioItemTable } from '$lib/server/db/schema/portfolioItems';
import { isPortfolioItemType, type PortfolioItemType } from '$lib/types/portfolio';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Upload } from '$lib/server/db/schema/uploads';
import { uploadImage } from '$lib/utils/uploads/image/uploadImage';
import { deleteFileAndUpload } from '$lib/utils/uploads/delete';
import { and, eq } from 'drizzle-orm';

export const load = (async ({ url }) => {
    const pageIndex = parseInt(url.searchParams.get('pageIndex') ?? "0");
    const itemsPerPage = parseInt(url.searchParams.get('itemsPerPage') ?? "20");
    const category = url.searchParams.get('category');

    const filters = [
        category && isPortfolioItemType(category) ? eq(portfolioItemTable.type, category) : undefined
    ].filter(Boolean);

    const where = filters.length > 0 ? and(...filters) : undefined;

    const [portfolioItems, portfolioItemCount] = await Promise.all([
        getPortfolioItems(itemsPerPage, pageIndex * itemsPerPage, where),
        getPortfolioItemCount(where)
    ]);

    return { portfolioItems: portfolioItems, portfolioItemCount: portfolioItemCount?.count ?? 0 };
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        const formDataObject = Object.fromEntries(formData);
        const { title, description, type, visiblePriority } = formDataObject as {
            title: string,
            description: string,
            type: string,
            visiblePriority: string
        };

        const imageFile = formData.get('image') as File | null;
        let image: Upload | undefined;

        try {
            image = imageFile && imageFile.size > 0 ? await uploadImage(imageFile, title) : undefined;
        } catch (e) {
            console.log(e);
            return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
        }

        const portfolioItem: typeof portfolioItemTable.$inferInsert = {
            title: title,
            description: description,
            type: type as PortfolioItemType,
            imageUploadId: image ? image.id : undefined,
            visiblePriority: parseInt(visiblePriority)
        }

        try {
            const newPortfolioItem = await createPortfolioItem(portfolioItem);

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
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const type = formData.get('type') as PortfolioItemType;
        const visiblePriority = parseInt(formData.get('visiblePriority') as string) || 0;
        const imageFile = formData.get('image') as File | null;

        let imageUploadId: string | undefined;

        if (imageFile && imageFile.size > 0) {
            try {
                const portfolioItem = await getPortfolioItemById(id);
                if (portfolioItem && portfolioItem.upload) {
                    await deleteFileAndUpload(portfolioItem.upload);
                };
                imageUploadId = (await uploadImage(imageFile, title)).id;
            } catch (e) {
                console.log(e);
                return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
            }
        };

        try {
            const updateData: Partial<typeof portfolioItemTable.$inferInsert> = {
                title,
                description,
                type,
                visiblePriority
            };

            if (imageUploadId) updateData.imageUploadId = imageUploadId;

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