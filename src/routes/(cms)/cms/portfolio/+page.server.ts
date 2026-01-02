import { createPortfolioItem, deletePortfolioItem, getPortfolioItemById, getPortfolioItems, updatePortfolioItem } from '$lib/server/db/cruds/portfolioItems';
import type { portfolioItems } from '$lib/server/db/schema/portfolioItems';
import type { PortfolioItemImage, PortfolioItemType } from '$lib/server/db/types/portfolio';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';
import { dev } from '$app/environment';
import sharp from 'sharp';

export const load = (async () => {
    const portfolioItems = await getPortfolioItems();

    return {
        portfolioItems: portfolioItems
    }
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
        const imageObject = await uploadImage(imageFile, title);

        const portfolioItem: typeof portfolioItems.$inferInsert = {
            title: title,
            description: description,
            type: type as PortfolioItemType,
            image: imageObject
        }

        try {
            const newPortfolioItem = await createPortfolioItem(portfolioItem);

            return {
                succes: true,
                portfolioItemId: newPortfolioItem.id,
                portfolioItemTitle: newPortfolioItem.title,
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

        const imageFile = formData.get('image') as File;
        let imageObject = undefined;

        if (imageFile.name && imageFile.size) {
            imageObject = await uploadImage(imageFile as File, title);
        }

        try {
            const updatedPortfolioItem = await updatePortfolioItem(id, {
                title: title,
                description: description,
                type: type as PortfolioItemType,
                image: imageObject
            });

            return {
                succes: true,
                portfolioItemId: updatedPortfolioItem.id,
                portfolioItemTitle: updatedPortfolioItem.title,
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
            const portfolioItemToDelete = await getPortfolioItemById(id);

            const thumbnailImageUrl = portfolioItemToDelete?.image?.thumbnail.url;
            const fullImageUrl = portfolioItemToDelete?.image?.url;

            if (thumbnailImageUrl) await checkAndRemove(getWriteAndDevSafeUrl(thumbnailImageUrl));
            if (fullImageUrl) await checkAndRemove(getWriteAndDevSafeUrl(fullImageUrl));
            
            await deletePortfolioItem(id);

            return {
                succes: true,
                portfolioItemTitle: portfolioItemToDelete?.title,
                action: 'delete'
            }
        } catch (e) {
            const error = e as Error;
            console.log(error);
            return fail(422, { error: error.message });
        }
    }
}

const uploadImage = async (image: File, title: string): Promise<PortfolioItemImage> => {
    const imageBuffer = await image.arrayBuffer();

    const fullImage = await sharp(imageBuffer).webp().toBuffer();
    const thumbnail = await sharp(imageBuffer).webp().resize(500, undefined).toBuffer();

    const fullImageName = `${title}.webp`;
    const thumgnailImageName = `${title}-thumnail.webp`;

    const fullImageUrl = path.join(getWriteAndDevSafeUrl(baseUrl), fullImageName);
    const thumbnailImageUrl = path.join(getWriteAndDevSafeUrl(baseUrl), thumgnailImageName);

    await writeFile(fullImageUrl, Buffer.from(fullImage));
    await writeFile(thumbnailImageUrl, Buffer.from(thumbnail));

    return {
        url: path.join(baseUrl, fullImageName),
        thumbnail: {
            url: path.join(baseUrl, thumgnailImageName),
            aspectRatio: '4/3'
        }
    }
}

const baseUrl = '/uploads/portfolio/images/';

const getWriteAndDevSafeUrl = (url: string) => {
    const devSaveUrl = dev ? path.join('static', url) : url;
    const writeUrl = path.join(process.cwd(), devSaveUrl);

    return writeUrl;
}

const checkAndRemove = async (url: string) => {
    if (fs.existsSync(url)) {
        await fs.unlink(url, e => {
            if (e) {
                const error = e as Error;
                console.log(e);
                return fail(422, { error: error.message});
            }
        });
    }
}