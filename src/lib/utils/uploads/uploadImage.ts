import sharp from "sharp";
import { writeFile } from 'fs/promises';
import { createUpload, deleteUpload } from "$lib/server/db/cruds/uploads";
import path from "path";
import type { Upload } from "$lib/types/uploads";
import { getUploadsFolder } from "$lib/server/db/utils/getUploadsFolder";
import fs from 'fs';
import { fail } from '@sveltejs/kit';

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

export { uploadImage, deleteImageUpload }