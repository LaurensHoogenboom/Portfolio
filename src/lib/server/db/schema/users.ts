import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generateId, timestamp } from "../utils/utils";
import type { UserType } from "$lib/types/users";

const users = sqliteTable("users", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => generateId()),
    username: text("username", { length: 120 }).notNull().unique(),
    password: text("password").$type<Uint8Array>().notNull(),
    type: text("type").$type<UserType>().notNull().default('default'),
    securityQuestion: text("securityQuestion", { length: 250 })
        .notNull(),
    securityQuestionAnswer: text("securityQuestionAnswer")
        .notNull(),
    ...timestamp
});

type UserWithSecrets = typeof users.$inferSelect;

type User = Omit<UserWithSecrets, "password" | "securityQuestionAnswer">;

export { users, type User, type UserWithSecrets };