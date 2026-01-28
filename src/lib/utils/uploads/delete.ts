import { deleteUpload } from "$lib/server/db/cruds/uploads";
import type { UploadFileType } from "$lib/types/uploads";
import type { Upload } from "$lib/server/db/schema/uploads";
import { getWriteUrl } from "./utils";
import { fail } from "@sveltejs/kit";
import fs from 'fs';

const deleteFileAndUpload = async (upload: Upload) => {
    if (upload.fileType == 'image') {
        if (!upload.image) return;

        const thumbnailFileName = upload.image.thumbnail.url.split('\\').pop();
        const fullImageName = upload.image.url.split('\\').pop();

        if (thumbnailFileName) await checkAndRemove(thumbnailFileName, 'image');
        if (fullImageName) await checkAndRemove(fullImageName, 'image');
    }

    if (upload.fileType == 'document') {
        if (!upload.document) return;

        const documentFileName = upload.document.url.split('\\').pop();
        if (documentFileName) await checkAndRemove(documentFileName, 'document');
    }

    await deleteUpload(upload.id);
}

const checkAndRemove = async (filename: string, fileType: UploadFileType) => {
    const path = getWriteUrl(filename, fileType);

    if (path && fs.existsSync(path)) {
        await fs.unlink(path, e => {
            if (e) {
                console.log(e);
                return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
            }
        });
    }
}

export { deleteFileAndUpload }