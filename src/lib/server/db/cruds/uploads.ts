import type { UploadFileType } from "$lib/types/uploads";
import { count, eq, SQL } from "drizzle-orm";
import { db } from "../client";
import { uploads } from "../schema/uploads";

const getUploads = async (number: number | 'all' = 20, offset: number = 0, where?: SQL<unknown>, sortBy: string = 'createdAt', sortDirection: 'asc' | 'desc' = 'desc') => {
    return await db.query.uploads.findMany({
        limit: number != 'all' ? number : undefined,
        offset: offset,
        where: where,
        orderBy: (fields, {asc, desc}) => {
            const column = fields[sortBy as keyof typeof fields] ?? fields.createdAt;
            return sortDirection == 'asc' ? [asc(column)] : [desc(column)] 
        }
    });
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

const getUploadCount = async (where?: SQL<unknown>) => {
    return await db.select({ count: count() }).from(uploads).where(where).get()
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

    return await db.update(uploads).set({ ...data, updatedAt: new Date() }).where(eq(uploads.id, id)).returning().get();
}

const deleteUpload = async (id: string) => {
    await db.delete(uploads).where(eq(uploads.id, id));
}

export { getUploads, getUploadsByFileType, getUploadById, getUploadByTitle, getUploadCount, createUpload, updateUpload, deleteUpload };