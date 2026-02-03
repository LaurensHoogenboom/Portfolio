import { getUploadById, getUploadCount, getUploads } from '$lib/server/db/cruds/uploads';
import type { Upload, UploadWithMeta } from '$lib/server/db/schema/uploads';
import { deleteFileAndUpload } from '$lib/utils/uploads/delete';
import { isUploadInUse } from '$lib/utils/uploads/utils';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getPortfolioItems } from '$lib/server/db/cruds/portfolioItems';
import type { IPortfolioItem } from '$lib/types/portfolio';
import { uploadImage } from '$lib/utils/uploads/image/uploadImage';
import { type UploadFileType } from '$lib/types/uploads';
import { uploadDocument } from '$lib/utils/uploads/document/uploadDocument';

export const load = (async ({url}) => {
    const pageIndex = parseInt(url.searchParams.get('pageIndex') ?? "0");
    const itemsPerPage = parseInt(url.searchParams.get('itemsPerPage') ?? "10");

    const [uploads, rawPortfolioItems, uploadCount] = await Promise.all([
        getUploads(itemsPerPage, pageIndex * itemsPerPage),
        getPortfolioItems('all'),
        getUploadCount()
    ]);

    const portfolioItems: IPortfolioItem[] = rawPortfolioItems.map((item) => {
        return {
            ...item,
            image: item.upload?.image ?? null
        }
    });

    const uploadsWithMeta: UploadWithMeta[] = await Promise.all(uploads.map(async uItem => ({
        ...uItem,
        isUsed: isUploadInUse(uItem, portfolioItems),
        url: uItem.fileType == 'document' && uItem.document 
            ? uItem.document.url 
            : uItem.fileType == 'image' && uItem.image 
                ? uItem.image.url
                : undefined
    })));

    return { uploads: uploadsWithMeta, uploadCount: uploadCount?.count ?? 0 };
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({request}) => {
        const formData = await request.formData();
        const formDataObject = Object.fromEntries(formData);
        const { title, description, type } = formDataObject as {
            title: string,
            description: string,
            type: UploadFileType
        }

        const file = formData.get('file') as File | null;
        let upload: Upload | undefined;

        try {
            if (type == 'document') {
                upload = file && file.size > 0 ? await uploadDocument(file, title, description) : undefined;
            } else if (type == 'image') {
                upload = file && file.size > 0 ? await uploadImage(file, title, description) : undefined;
            }
            
            return {
                uploadId: upload?.id,
                uploadTitle: upload?.title
            }
        } catch (e) {
            console.log(e);
            return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
        }
    },
    delete: async ({request}) => {
        const data = await request.formData();
        const id = data.get('id') as string;

        try {
            const upload = await getUploadById(id);

            if (upload) {
                await deleteFileAndUpload(upload);
            }

            return {
                itemName: upload?.title,
            }
        } catch (e) {
            console.log(e);
            return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
        }
    }
}