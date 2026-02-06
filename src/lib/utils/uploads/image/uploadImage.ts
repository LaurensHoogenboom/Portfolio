import sharp from "sharp";
import { writeFile } from 'fs/promises';
import { createUpload } from "$lib/server/db/cruds/uploads";
import path from "path";
import type { Upload } from "$lib/server/db/schema/uploads";
import { getWriteUrl } from "../utils";

const uploadImage = async (image: File | Buffer, title: string, description?: string): Promise<Upload> => {
    const imageBuffer = image instanceof File ? await image.arrayBuffer() : image;
    const metaData = await sharp(imageBuffer).metadata();

    const fullImage = await sharp(imageBuffer, { animated: metaData.format == 'gif' ? true : false, limitInputPixels: false })
        .webp()
        .resize(metaData.width > 1920 ? 1920 : undefined, undefined)
        .toBuffer();
    const thumbnail = await sharp(imageBuffer, { limitInputPixels: false })
        .webp()
        .resize(undefined, 768)
        .toBuffer();

    const fullImageName = `${title.replace(/[^a-zA-Z0-9]/g, "")}.webp`;
    const thumbnailImageName = `${title.replace(/[^a-zA-Z0-9]/g, "")}-thumnail.webp`;

    const fullImageUrl = getWriteUrl(fullImageName, 'image');
    const thumbnailImageUrl = getWriteUrl(thumbnailImageName, 'image');

    let upload: Upload;

    try {
        upload = await createUpload({
            title: title,
            fileType: 'image',
            image: {
                url: path.join('/images/', fullImageName),
                thumbnail: {
                    url: path.join('/images/', thumbnailImageName),
                    aspectRatio: metaData.width / metaData.height
                }
            },
            description: description
        });
    } catch (e) {
        console.log(e);
        throw e;
    }

    await writeFile(fullImageUrl, Buffer.from(fullImage));
    await writeFile(thumbnailImageUrl, Buffer.from(thumbnail));

    return upload;
}

export { uploadImage }