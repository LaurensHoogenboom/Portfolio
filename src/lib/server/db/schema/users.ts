import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generateId, timestamp } from "../utils/utils";

const users = sqliteTable("users", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => generateId()),
    username: text("username", { length: 120 }).notNull().unique(),
    password: text("password").$type<Uint8Array>().notNull(),
    securityQuestion: text("securityQuestion", { length: 250 })
        .notNull(),
    securityQuestionAnswer: text("securityQuestionAnswer")
        .notNull(),
    
    ...timestamp
})

export { users };
