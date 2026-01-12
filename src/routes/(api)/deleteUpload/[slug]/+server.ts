import { getUploadByTitle } from '$lib/server/db/cruds/uploads';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteFileAndUpload } from '$lib/utils/uploads/delete';

export const POST: RequestHandler = async ({ params }) => {
    const title = params.slug;
    const upload = await getUploadByTitle(title);

    if (!upload) return json({success: 0});

    try {
        await deleteFileAndUpload(upload);
        return new Response();
    } catch (e) {
        console.log(e);
        return error(400, 'Could not delete upload.');
    }
};