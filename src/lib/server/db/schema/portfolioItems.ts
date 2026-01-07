import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generateId, timestamp } from "../utils/utils";
import { type PortfolioItemImage, type PortfolioItemType } from '../../../types/portfolio';

const portfolioItems = sqliteTable("portfolioItems", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => generateId()),
    title: text("title", {length: 120}).notNull().unique(),
    description: text("description"),
    type: text("type").$type<PortfolioItemType>().notNull(),
    image: text("image", {mode: "json"}).$type<PortfolioItemImage>(),
    ...timestamp
});

export { portfolioItems };

