import { getUploadsFolder } from "$lib/server/db/utils/getUploadsFolder";
import type { UploadFileType } from "$lib/types/uploads";
import path from "path";

const getWriteAndDevSafeUrl = (filename: string, fileType: UploadFileType) => {
    if (fileType == 'image') {
        return path.join(getUploadsFolder('portfolio'), 'images', filename);
    } else {
        return path.join(getUploadsFolder('portfolio'), 'documents', filename);
    }
}

export { getWriteAndDevSafeUrl };