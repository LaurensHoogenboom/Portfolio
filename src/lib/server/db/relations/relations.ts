import { relations } from "drizzle-orm";
import { portfolioItems } from "../schema/portfolioItems";
import { uploads } from "../schema/uploads";
import { users } from "../schema/users";
import { workspaces } from "../schema/workspaces";

const portfoliItemRelations = relations(portfolioItems, ({ one }) => ({
    upload: one(uploads, {
        fields: [portfolioItems.imageUploadId],
        references: [uploads.id]
    })
}));

const uploadRelations = relations(uploads, ({ many }) => ({
    portfolioItems: many(portfolioItems)
}));

const userRelations = relations(users, ({ one }) => ({
    preferredWorkspace: one(workspaces, {
        fields: [users.preferredWorkspaceId],
        references: [workspaces.id]
    })
}));

const workspacesRelations = relations(workspaces, ({many}) => ({
    users: many(workspaces)
}));

export { portfoliItemRelations, uploadRelations, userRelations, workspacesRelations }