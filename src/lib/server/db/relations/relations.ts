import { relations } from "drizzle-orm";
import { portfolioItems } from "../schema/portfolioItems";
import { uploads } from "../schema/uploads";

const portfoliItemRelations = relations(portfolioItems, ({ one }) => ({
    upload: one(uploads, {
        fields: [portfolioItems.imageUploadId],
        references: [uploads.id]
    })
}));

const uploadRelations = relations(uploads, ({ many }) => ({
    portfolioItems: many(portfolioItems)
}));

export { portfoliItemRelations, uploadRelations }