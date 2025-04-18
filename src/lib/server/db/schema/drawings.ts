import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generateId, timestamp } from "../utils/utils";


const drawings = sqliteTable("drawings", {
	id: text("id")
		.primaryKey()
		.notNull()
		.$defaultFn(() => generateId()),
	title: text("title", {length: 255}).notNull(),

    ...timestamp
});

export { drawings };