import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { uploadImage } from '$lib/utils/uploads/image/uploadImage';
import { generateId } from '$lib/server/db/utils/utils';

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.formData();
    const imageFile = data.get('image');

    if (!imageFile || !(imageFile instanceof File)) {
        return json({success: 0, status: 400});
    }

    try {
        const upload = await uploadImage(imageFile, generateId());
        const answer = {
            success: upload,
            file: {
                url: upload.image?.url
            },
            upload: upload
        }

        return json(answer);
    } catch (e) {
        console.log(e);
        throw error(400, 'Failed to upload image file.');
    }
};