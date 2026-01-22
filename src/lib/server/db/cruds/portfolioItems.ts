import { eq } from "drizzle-orm";
import { db } from "../client"
import { portfolioItems } from "../schema/portfolioItems";
import type { PortfolioItemType } from "../../../types/portfolio";

const getPortfolioItems = async (number: number = 20, offset: number = 0) => {
    return await db.query.portfolioItems.findMany({
        limit: number,
        offset: offset,
        with: {
            upload: true
        }
    });
}

const getPortfolioItemsByType = async (type: PortfolioItemType) => {
    return await db.query.portfolioItems.findMany({
        where: (portfolioItems, {eq}) => eq(portfolioItems.type, type),
        with: {
            upload: true
        }
    });
}

const getPortfolioItemById = async (id: string) => {
    return await db.query.portfolioItems.findFirst({
        where: (portfolioItems, {eq}) => eq(portfolioItems.id, id),
        with: {
            upload: true
        }
    });
}

const getPortfolioItemByTitle = async (title: string) => {
    return await db.query.portfolioItems.findFirst({
        where: (portfolioItems, {eq}) => eq(portfolioItems.title, title),
        with: {
            upload: true
        }
    });
}

const createPortfolioItem = async (data: typeof portfolioItems.$inferInsert) => {
    if (!data.title || !data.type) {
        throw new Error("A portfolio item must have a title and a type.");
    }

    const titleExists = await getPortfolioItemByTitle(data.title);

    if (titleExists) {
        throw new Error("A portfolio item must have a unique title.");
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
        const titleExists = await db.select().from(portfolioItems).where(eq(portfolioItems.title, data.title)).get();

        if (titleExists) {
            throw new Error("A portfolio item must have a unique title.");
        }
    }

    const updatedItem = await db.update(portfolioItems)
        .set(data)
        .where(eq(portfolioItems.id, id))
        .returning()
        .get();

    return await getPortfolioItemById(updatedItem.id);
}

const deletePortfolioItem = async (id: string) => {
    await db.delete(portfolioItems)
        .where(eq(portfolioItems.id, id));
}

export { getPortfolioItems, getPortfolioItemsByType, getPortfolioItemByTitle, getPortfolioItemById, createPortfolioItem, updatePortfolioItem, deletePortfolioItem }