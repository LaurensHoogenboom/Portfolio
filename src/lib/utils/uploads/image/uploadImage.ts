import sharp from "sharp";
import { writeFile } from 'fs/promises';
import { createUpload } from "$lib/server/db/cruds/uploads";
import path from "path";
import type { Upload } from "$lib/types/uploads";
import { getWriteUrl } from "../utils";

const uploadImage = async (image: File | Buffer, title: string): Promise<Upload> => {
    const imageBuffer = image instanceof File ? await image.arrayBuffer() : image;
    const metaData = await sharp(imageBuffer).metadata();

    let fullImage: Buffer<ArrayBufferLike>;
    let thumbnail: Buffer<ArrayBufferLike>;
    let targetFormat: 'webp' | 'gif' = 'webp';

    if (metaData.format == 'gif') {
        fullImage = (metaData.width > 1920)
            ? await sharp(imageBuffer, { animated: true }).resize(1920, undefined).toBuffer()
            : await sharp(imageBuffer, { animated: true }).toBuffer();
        thumbnail = await sharp(imageBuffer, { animated: false }).resize(500, undefined).toBuffer();
        targetFormat = 'gif';
    } else {
        fullImage = await sharp(imageBuffer).webp().resize(1920, undefined).toBuffer();
        thumbnail = await sharp(imageBuffer).webp().resize(500, undefined).toBuffer();
    }

    const fullImageName = `${title.replace(/[^a-zA-Z0-9]/g, "")}.${targetFormat}`;
    const thumbnailImageName = `${title.replace(/[^a-zA-Z0-9]/g, "")}-thumnail.${targetFormat}`;

    const fullImageUrl = getWriteUrl(fullImageName, 'image');
    const thumbnailImageUrl = getWriteUrl(thumbnailImageName, 'image');

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

export { uploadImage }