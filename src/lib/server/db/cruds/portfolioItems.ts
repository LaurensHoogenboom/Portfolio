import { eq } from "drizzle-orm";
import { db } from "../client"
import { portfolioItems } from "../schema/portfolioItems";
import type { PortfolioItemType } from "../../../types/portfolio";

const getPortfolioItems = async (number: number = 10, offset: number = 0) => {
    return await db.select().from(portfolioItems).limit(number).offset(offset);
}

const getPortfolioItemsByType = async (type: PortfolioItemType) => {
    return await db.select().from(portfolioItems).where(eq(portfolioItems.type, type));
}

const getPortfolioItemById = async (id: string) => {
    return await db.select().from(portfolioItems).where(eq(portfolioItems.id, id)).get();
}

const getPortfolioItemByTitle = async (title: string) => {
    const item = await db.select().from(portfolioItems).where(eq(portfolioItems.title, title)).get();

    if (item) {
        return item;
    } else {
        throw new Error("No portfolio item with this title was found.");
    }
}

const createPortfolioItem = async (data: typeof portfolioItems.$inferInsert) => {
    if (!data.title || !data.type) {
        throw new Error("A portfolio item must have a title and a type.");
    }

    const titleExists = await db.select().from(portfolioItems).where(eq(portfolioItems.title, data.title)).get();

    if (titleExists) {
        throw new Error("A portfolio item must have a unique title.");
    }

    return await db.insert(portfolioItems).values(data).returning().get();
}

const updatePortfolioItem = async (id: string, data: Partial<typeof portfolioItems.$inferInsert>) => {
    const portfolioItem = db.select().from(portfolioItems).where(eq(portfolioItems.id, id)).get();
    
    if (data.title && data.title != portfolioItem?.title) {
        const titleExists = await db.select().from(portfolioItems).where(eq(portfolioItems.title, data.title)).get();

        if (titleExists) {
            throw new Error("A portfolio item must have a unique title.");
        }
    }
    
    return await db.update(portfolioItems).set(data).where(eq(portfolioItems.id, id)).returning().get();
}

const deletePortfolioItem = async (id: string) => {
    await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
}

export { getPortfolioItems, getPortfolioItemsByType, getPortfolioItemByTitle, getPortfolioItemById, createPortfolioItem, updatePortfolioItem, deletePortfolioItem }