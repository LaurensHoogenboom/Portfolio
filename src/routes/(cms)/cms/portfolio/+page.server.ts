import { createPortfolioItem, deletePortfolioItem, getPortfolioItemById, getPortfolioItems, updatePortfolioItem } from '$lib/server/db/cruds/portfolioItems';
import type { portfolioItems } from '$lib/server/db/schema/portfolioItems';
import type { PortfolioItemType } from '$lib/types/portfolio';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Upload } from '$lib/server/db/schema/uploads';
import { uploadImage } from '$lib/utils/uploads/image/uploadImage';
import { deleteFileAndUpload } from '$lib/utils/uploads/delete';

export const load = (async () => {
    const portfolioItems = await getPortfolioItems();
    return { portfolioItems: portfolioItems };
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

        const imageFile = formData.get('image');
        let image: Upload | undefined;

        try {
            image = imageFile ? await uploadImage(imageFile as File, title) : undefined;
        } catch (e) {
            const error = e as Error;
            console.log(error);
            return fail(422, { error: error.message });
        }

        const portfolioItem: typeof portfolioItems.$inferInsert = {
            title: title,
            description: description,
            type: type as PortfolioItemType,
            imageUploadId: image ? image.id : undefined,
            visiblePriority: parseInt(visiblePriority)
        }

        try {
            const newPortfolioItem = await createPortfolioItem(portfolioItem);

            return {
                succes: true,
                portfolioItemId: newPortfolioItem?.id,
                portfolioItemTitle: newPortfolioItem?.title,
                action: 'create'
            }
        } catch (e) {
            const error = e as Error;
            console.log(error);
            return fail(422, { error: error.message });
        }
    },
    update: async ({ request }) => {
        const formData = await request.formData();
        const formDataObject = Object.fromEntries(formData);
        const { id, title, description, type, visiblePriority } = formDataObject as {
            id: string
            title: string,
            description: string,
            type: string,
            visiblePriority: string
        };

        const imageFile = formData.get('image') as File;
        let imageUpload: Upload | undefined;

        if (imageFile.name && imageFile.size) {
            const portfolioItem = await getPortfolioItemById(id);

            if (portfolioItem && portfolioItem.upload) {
                await deleteFileAndUpload(portfolioItem.upload);
            };

            try {
                imageUpload = await uploadImage(imageFile, title);
            } catch (e) {
                const error = e as Error;
                console.log(error);
                return fail(422, { error: error.message });
            }
        };

        try {
            const updatedPortfolioItem = await updatePortfolioItem(id, {
                title: title,
                description: description,
                type: type as PortfolioItemType,
                imageUploadId: imageUpload ? imageUpload.id : undefined,
                visiblePriority: parseInt(visiblePriority)
            });

            return {
                succes: true,
                portfolioItemId: updatedPortfolioItem?.id,
                portfolioItemTitle: updatedPortfolioItem?.title,
                action: 'update'
            }
        } catch (e) {
            const error = e as Error;
            console.log(error);
            return fail(422, { error: error.message });
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
                succes: true,
                portfolioItemTitle: portfolioItem?.title,
                action: 'delete'
            }
        } catch (e) {
            const error = e as Error;
            console.log(error);
            return fail(422, { error: error.message });
        }
    }
}