import { getUploadById, getUploads } from '$lib/server/db/cruds/uploads';
import type { UploadWithMeta } from '$lib/server/db/schema/uploads';
import { deleteFileAndUpload } from '$lib/utils/uploads/delete';
import { isUploadInUse } from '$lib/utils/uploads/utils';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getPortfolioItems } from '$lib/server/db/cruds/portfolioItems';
import type { IPortfolioItem } from '$lib/types/portfolio';

export const load = (async () => {
    const uploads = await getUploads(200);
    const portfolioItems: IPortfolioItem[] = (await getPortfolioItems(200)).map((item) => {
        return {
            ...item,
            image: item.upload?.image ?? null
        }
    });

    const uploadsWithMeta: UploadWithMeta[] = await Promise.all(uploads.map(async uItem => ({
        ...uItem,
        isUsed: isUploadInUse(uItem, portfolioItems)
    })));

    return { uploads: uploadsWithMeta };
}) satisfies PageServerLoad;

export const actions: Actions = {
    delete: async ({request}) => {
        const data = await request.formData();
        const id = data.get('id') as string;

        try {
            const upload = await getUploadById(id);

            if (upload) {
                await deleteFileAndUpload(upload);
            }

            return {
                succes: true,
                itemName: upload?.title,
                action: 'delete'
            }
        } catch (e) {
            console.log(e);
            return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
        }
    }
}