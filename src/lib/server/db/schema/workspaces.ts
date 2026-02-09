import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generateId, timestamp } from "../utils/utils";
import type { INavigationItem } from "../../../../routes/(cms)/cms/shared/navigation";

const workspaces = sqliteTable("workspaces", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => generateId()),
    title: text("title", { length: 120 }).notNull().unique(),
    navigationItems: text("navigationItems", {mode: 'json'}).$type<Array<INavigationItem>>(),
    adminRequired: integer({ mode: "boolean" }).notNull().default(false),
    ...timestamp
});

type Workspace = typeof workspaces.$inferSelect;

export { workspaces, type Workspace }