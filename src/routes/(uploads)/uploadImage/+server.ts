import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { uploadImage } from '$lib/utils/uploads/uploadImage';
import { generateId } from '$lib/server/db/utils/utils';
import type { Upload } from '$lib/types/uploads';

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.formData();
    const imageFile = data.get('image');

    if (!imageFile || !(imageFile instanceof File)) {
        return json({succes: 0, statud: 400});
    }

    const upload: Upload = await uploadImage(imageFile, generateId());

    const answer = {
        success: 1,
        file: {
            url: upload.image?.url
        },
        upoad: upload
    }

    return json(answer);
};