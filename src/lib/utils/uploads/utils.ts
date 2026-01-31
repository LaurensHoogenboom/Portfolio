import type { UploadFileType } from "$lib/types/uploads";
import path from "path";
import type { Upload } from "$lib/server/db/schema/uploads";
import type { IPortfolioItem } from "$lib/types/portfolio";
import { env } from '$env/dynamic/private';

const getUploadsFolder = (type: 'cms' | 'portfolio') => {
    return env.UPLOADS_FOLDER + `/${type}/`;
}

const getWriteUrl = (filename: string, fileType: UploadFileType) => {
    if (fileType == 'image') {
        return path.join(getUploadsFolder('portfolio'), 'images', filename);
    } else {
        return path.join(getUploadsFolder('portfolio'), 'documents', filename);
    }
}

const isUploadInUse = (upload: Upload, portfolioItems: IPortfolioItem[]): boolean => {
    return portfolioItems.some(p => {
        if (upload?.fileType == 'document') {
            return false;
        }

        if (upload?.fileType == 'image' && upload.image) {
            if (p.image?.url == upload.image.url) return true;

            if (p.articleContent) {
                const contentString = JSON.stringify(p.articleContent);
                const fileName = upload.image.url.split(/[\\/]/).pop();

                if (fileName && contentString.includes(fileName)) {
                    return true;
                }
            }
        }

        return false;
    });
}

export { getWriteUrl, getUploadsFolder, isUploadInUse };