import type { UploadFileType } from "$lib/types/uploads";
import { eq } from "drizzle-orm";
import { db } from "../client";
import { uploads } from "../schema/uploads";

const getUploads = async (number: number = 10, offset: number = 0) => {
    return await db.select().from(uploads).limit(number).offset(offset);
}

const getUploadsByFileType = async (fileType: UploadFileType) => {
    return await db.select().from(uploads).where(eq(uploads.fileType, fileType));
}

const getUploadByTitle = async (title: string) => {
    return await db.select().from(uploads).where(eq(uploads.title, title)).get();
}

const getUploadById = async (id: string) => {
    return await db.select().from(uploads).where(eq(uploads.id, id)).get();
}

const createUpload = async (data: typeof uploads.$inferInsert) => {
    if (!data.title) {
        throw new Error("An upload must have a title.");
    }

    const titleExists = await getUploadByTitle(data.title);

    if (titleExists) {
        throw new Error("An upload must have an unique title.");
    }

    return await db.insert(uploads).values(data).returning().get();
}

const updateUpload = async (id: string, data: Partial<typeof uploads.$inferInsert>) => {
    const uploadToUpdate = await getUploadById(id);

    if (data.title && data.title != uploadToUpdate?.id) {
        const titleExists = await getUploadByTitle(data.title);

        if (titleExists) {
            throw new Error("An upload must have an unique title.");
        }
    }

    return await db.update(uploads).set({...data, updatedAt: new Date()}).where(eq(uploads.id, id)).returning().get();
}

const deleteUpload = async (id: string) => {
    await db.delete(uploads).where(eq(uploads.id, id));
}

export { getUploads, getUploadsByFileType, getUploadById, getUploadByTitle, createUpload, updateUpload, deleteUpload };