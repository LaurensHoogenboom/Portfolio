import { count, eq, type SQL } from "drizzle-orm";
import { db } from "../client";
import { workspaces } from "../schema/workspaces";

const getWorkspaces = async (number: number | 'all' = 20, offset: number = 0, where?: SQL<unknown>, sortBy: string = 'title', sortDirection: 'asc' | 'desc' = 'desc') => {
    return await db.query.workspaces.findMany({
        limit: number != 'all' ? number : undefined,
        offset: offset,
        where: where,
        orderBy: (fields, { asc, desc }) => {
            const column = fields[sortBy as keyof typeof fields] ?? fields.title;
            return sortDirection == 'asc' ? [asc(column)] : [desc(column)]
        }
    });
}

const getWorkspaceById = async (id: string) => {
    return await db.select().from(workspaces).where(eq(workspaces.id, id)).get();
}

const getWorkspaceByTitle = async (title: string) => {
    return await db.select().from(workspaces).where(eq(workspaces.title, title)).get();
}

const getWorkspaceCount = async (where?: SQL<unknown>) => {
    return await db.select({ count: count() }).from(workspaces).where(where).get();
}

const createWorkspace = async (data: typeof workspaces.$inferInsert) => {
    if (!data.title) {
        throw new Error("An workspace must have a title.");
    }

    const titleExists = await getWorkspaceByTitle(data.title);

    if (titleExists) {
        throw new Error("An workspace must have an unique title.");
    }

    return await db.insert(workspaces).values(data).returning().get();
}

const updateWorkspace = async (id: string, data: Partial<typeof workspaces.$inferInsert>) => {
    const worspaceToUpdate = await getWorkspaceById(id);

    if (data.title && data.title != worspaceToUpdate?.title) {
        const titleExists = await getWorkspaceByTitle(data.title);

        if (titleExists) {
            throw new Error("An workspace must have an unique title.");
        }
    }

    return await db.update(workspaces).set({ ...data, updatedAt: new Date() }).where(eq(workspaces.id, id)).returning().get();
}

const deleteWorkspace = async (id: string) => {
    return await db.delete(workspaces).where(eq(workspaces.id, id)).returning().get();
}

export { getWorkspaces, getWorkspaceById, getWorkspaceByTitle, getWorkspaceCount, createWorkspace, updateWorkspace, deleteWorkspace }