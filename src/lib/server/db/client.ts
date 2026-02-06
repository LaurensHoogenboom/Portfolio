import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as portfolioItems from "./schema/portfolioItems";
import * as uploads from "./schema/uploads";
import * as users from "./schema/users";
import * as relations from './relations/relations';

let dbUrl: string | undefined;
    
try {
    const { env } = await import('$env/dynamic/private');
    dbUrl = env.DB_URL;
} catch {
    const dotenv = await import('dotenv');
    dotenv.config();
    dbUrl = process.env.DB_URL;
}

if (!dbUrl) {
    throw new Error("DB_URL is not defined.");
}

const sqlite = new Database(dbUrl);
const db = drizzle(sqlite, {
    schema: {
        ...portfolioItems,
        ...uploads,
        ...users,
        ...relations
    }
});

export { db, sqlite }