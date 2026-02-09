import { building } from '$app/environment';
import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as portfolioItems from "./schema/portfolioItems";
import * as uploads from "./schema/uploads";
import * as users from "./schema/users";
import * as workspaces from "./schema/workspaces";
import * as relations from './relations/relations';

const schema = {
    ...portfolioItems,
    ...uploads,
    ...users,
    ...relations,
    ...workspaces
}

type DbClient = BetterSQLite3Database<typeof schema>;

let db: DbClient;

if (!building) {
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
    db = drizzle(sqlite, { schema });
}

export { db };