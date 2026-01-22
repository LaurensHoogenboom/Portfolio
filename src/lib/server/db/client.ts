import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { env } from '$env/dynamic/private';
import * as portfolioItems from "./schema/portfolioItems";
import * as uploads from "./schema/uploads";
import * as users from "./schema/users";
import * as relations from './relations/relations';

const sqlite = new Database(env.DB_URL);
const db = drizzle(sqlite, {
    schema: {
        ...portfolioItems,
        ...uploads,
        ...users,
        ...relations
    }
});

export { db, sqlite }