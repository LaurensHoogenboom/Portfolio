import { createPortfolioItem, deletePortfolioItem, getPortfolioItemById, getPortfolioItems, updatePortfolioItem } from '$lib/server/db/cruds/portfolioItems';
import type { portfolioItems } from '$lib/server/db/schema/portfolioItems';
import type { PortfolioItemType } from '$lib/types/portfolio';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { getUploadsFolder } from '$lib/server/db/utils/getUploadsFolder';
import type { Upload } from '$lib/types/uploads';
import { createUpload, deleteUpload } from '$lib/server/db/cruds/uploads';

export const load = (async () => {
    const portfolioItems = await getPortfolioItems();
    return { portfolioItems: portfolioItems };
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        const formDataObject = Object.fromEntries(formData);
        const { title, description, type } = formDataObject as {
            title: string,
            description: string,
            type: string
        };

        const imageFile = formData.get('image') as File;
        const image: Upload = await uploadImage(imageFile, title);

        const portfolioItem: typeof portfolioItems.$inferInsert = {
            title: title,
            description: description,
            type: type as PortfolioItemType,
            imageUploadId: image.id
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
        const { id, title, description, type } = formDataObject as {
            id: string
            title: string,
            description: string,
            type: string
        };

        let imageUpload: Upload | undefined = undefined;
        const imageFile = formData.get('image') as File;

        if (imageFile.name && imageFile.size) {
            const portfolioItem = await getPortfolioItemById(id);

            if (portfolioItem && portfolioItem.upload) {
                await deleteImageUpload(portfolioItem.upload);
            };

            imageUpload = await uploadImage(imageFile, title);
        };

        try {
            const updatedPortfolioItem = await updatePortfolioItem(id, {
                title: title,
                description: description,
                type: type as PortfolioItemType,
                imageUploadId: imageUpload ? imageUpload.id : undefined
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
                await deleteImageUpload(portfolioItem.upload);
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

const uploadImage = async (image: File | Buffer, title: string): Promise<Upload> => {
    const imageBuffer = image instanceof File ? await image.arrayBuffer() : image;
    const metaData = await sharp(imageBuffer).metadata();

    const fullImage = await sharp(imageBuffer).webp().toBuffer();
    const thumbnail = await sharp(imageBuffer).webp().resize(500, undefined).toBuffer();

    const fullImageName = `${title.replace(/[^a-zA-Z0-9]/g, "")}.webp`;
    const thumbnailImageName = `${title.replace(/[^a-zA-Z0-9]/g, "")}-thumnail.webp`;

    const fullImageUrl = getWriteAndDevSafeUrl(fullImageName);
    const thumbnailImageUrl = getWriteAndDevSafeUrl(thumbnailImageName);

    await writeFile(fullImageUrl, Buffer.from(fullImage));
    await writeFile(thumbnailImageUrl, Buffer.from(thumbnail));

    const upload = await createUpload({
        title: title,
        fileType: 'image',
        image: {
            url: path.join('/images/', fullImageName),
            thumbnail: {
                url: path.join('/images/', thumbnailImageName),
                aspectRatio: metaData.width / metaData.height
            }
        }
    });

    return upload;
}

const getWriteAndDevSafeUrl = (filename: string) => {
    return path.join(getUploadsFolder('portfolio'), 'images', filename);
}

const deleteImageUpload = async (upload: Upload) => {
    if (!upload.image) return;

    const thumbnailFileName = upload.image.thumbnail.url.split('\\').pop();
    const fullImageName = upload.image.url.split('\\').pop();

    if (thumbnailFileName) await checkAndRemove(thumbnailFileName);
    if (fullImageName) await checkAndRemove(fullImageName);
    
    await deleteUpload(upload.id);
}

const checkAndRemove = async (filename:string ) => {
    const path = getWriteAndDevSafeUrl(filename);

    if (fs.existsSync(path)) {
        await fs.unlink(path, e => {
            if (e) {
                const error = e as Error;
                console.log(error);
                return fail(422, { error: error.message });
            }
        });
    }
}