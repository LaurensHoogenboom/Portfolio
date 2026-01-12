import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as dotenv from "dotenv";
import * as portfolioItems from "./schema/portfolioItems";
import * as posts from "./schema/posts";
import * as uploads from "./schema/uploads";
import * as users from "./schema/users";
import * as relations from './relations/relations';

dotenv.config();

const sqlite = new Database(process.env.DB_URL);
const db = drizzle(sqlite, { schema: {
    ...portfolioItems,
    ...posts,
    ...uploads,
    ...users,
    ...relations
}});

export { db, sqlite }