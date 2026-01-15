import type { UploadFileType } from "$lib/types/uploads";
import path from "path";
import * as dotenv from "dotenv";

const getUploadsFolder = (type: 'cms' | 'portfolio') => {
    dotenv.config();
    return process.env.UPLOADS_FOLDER + `/${type}/`;
}

const getWriteUrl = (filename: string, fileType: UploadFileType) => {
    if (fileType == 'image') {
        return path.join(getUploadsFolder('portfolio'), 'images', filename);
    } else {
        return path.join(getUploadsFolder('portfolio'), 'documents', filename);
    }
}

export { getWriteUrl, getUploadsFolder };