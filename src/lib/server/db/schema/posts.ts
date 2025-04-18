import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generateId, timestamp } from "../utils/utils";

const posts = sqliteTable("posts", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => generateId()),
    title: text("title", { length: 255 }).notNull(),
    slug: text("slug", { length: 255 }).notNull().unique(),
    body: text("body"),
    tags: text("tags", {mode: "json"}).$type<string[]>(),

    ...timestamp
});

export { posts };