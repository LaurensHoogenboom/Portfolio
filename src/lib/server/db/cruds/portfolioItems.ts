import { count, eq, SQL } from "drizzle-orm";
import { db } from "../client"
import { portfolioItems } from "../schema/portfolioItems";
import type { PortfolioItemType } from "../../../types/portfolio";

const getPortfolioItems = async (number: number | 'all' = 20, offset: number = 0, where?: SQL<unknown>, sortDirection: 'asc' | 'desc' = 'desc', sortBy: string = 'visiblePriority') => {
    return await db.query.portfolioItems.findMany({
        limit: number != 'all' ? number : undefined,
        offset: offset,
        orderBy: (fields, { asc, desc }) => {
            const column = fields[sortBy as keyof typeof fields] ?? fields.visiblePriority;
            return sortDirection == 'asc' ? [asc(column)] : [desc(column)]
        },
        with: {
            upload: true
        },
        where: where
    });
}

const getPortfolioItemsByType = async (type: PortfolioItemType) => {
    return await db.query.portfolioItems.findMany({
        where: (portfolioItems, { eq }) => eq(portfolioItems.type, type),
        with: {
            upload: true
        }
    });
}

const getPortfolioItemById = async (id: string) => {
    return await db.query.portfolioItems.findFirst({
        where: (portfolioItems, { eq }) => eq(portfolioItems.id, id),
        with: {
            upload: true
        }
    });
}

const getPortfolioItemByTitle = async (title: string) => {
    return await db.query.portfolioItems.findFirst({
        where: (portfolioItems, { eq }) => eq(portfolioItems.title, title),
        with: {
            upload: true
        }
    });
}

const getPortfolioItemCount = async (where?: SQL<unknown>) => {
    return await db.select({ count: count() }).from(portfolioItems).where(where).get();
}

const createPortfolioItem = async (data: typeof portfolioItems.$inferInsert) => {
    if (!data.title || !data.type) {
        throw new Error("A portfolio item must have a title and a type.");
    }

    const titleExists = await getPortfolioItemByTitle(data.title);

    if (titleExists) {
        throw new Error("A portfolio item must have an unique title.");
    }

    const createdItem = await db
        .insert(portfolioItems)
        .values(data)
        .returning()
        .get();

    return await getPortfolioItemById(createdItem.id);
}

const updatePortfolioItem = async (id: string, data: Partial<typeof portfolioItems.$inferInsert>) => {
    const portfolioItem = await getPortfolioItemById(id);

    if (data.title && data.title != portfolioItem?.title) {
        const titleExists = await getPortfolioItemByTitle(data.title);

        if (titleExists) {
            throw new Error("A portfolio item must have an unique title.");
        }
    }

    const updatedItem = await db.update(portfolioItems)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(portfolioItems.id, id))
        .returning()
        .get();

    return await getPortfolioItemById(updatedItem.id);
}

const deletePortfolioItem = async (id: string) => {
    await db.delete(portfolioItems)
        .where(eq(portfolioItems.id, id));
}

export { getPortfolioItems, getPortfolioItemsByType, getPortfolioItemByTitle, getPortfolioItemById, getPortfolioItemCount, createPortfolioItem, updatePortfolioItem, deletePortfolioItem }