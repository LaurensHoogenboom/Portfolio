import { createUpload } from "$lib/server/db/cruds/uploads";
import path from "path";
import { getWriteUrl } from "../utils";
import { writeFile } from "fs/promises";
import type { Upload } from "$lib/server/db/schema/uploads";


const uploadDocument = async (document: File, title: string, description?: string): Promise<Upload> => {
    const documentBuffer = await document.arrayBuffer();
    const extension = document.name.split('.').pop();;

    const fullDocumentName = `${title.replace(/[^a-zA-Z0-9]/g, "")}.${extension}`;
    const writeUrl = getWriteUrl(fullDocumentName, 'document');

    let upload: Upload;

    try {
        upload = await createUpload({
            title: title,
            description: description,
            fileType: 'document',
            document: { url: path.join('/documents/', fullDocumentName)}
        })
    } catch (e) {
        console.log(e);
        throw e;
    }

    await writeFile(writeUrl, Buffer.from(documentBuffer));

    return upload;
}

export { uploadDocument }