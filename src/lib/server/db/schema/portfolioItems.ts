import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generateId, timestamp } from "../utils/utils";
import type { PortfolioItemType } from '../../../types/portfolio';
import type { OutputData } from "@editorjs/editorjs";
import { uploads } from "./uploads";

const portfolioItems = sqliteTable("portfolioItems", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => generateId()),
    title: text("title", {length: 120}).notNull().unique(),
    description: text("description"),
    type: text("type").$type<PortfolioItemType>().notNull(),
    imageUploadId: text("imageUploadId").references(() => uploads.id, {
        onDelete: 'set null',
        onUpdate: 'cascade'
    }),
    visiblePriority: integer({mode: "number"}).default(0).notNull(),
    articleContent: text("articleContent", {mode: "json"}).$type<OutputData>(),
    ...timestamp
});

export { portfolioItems };

