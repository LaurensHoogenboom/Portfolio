import type { Config } from "drizzle-kit";
import 'dotenv/config';

export default {
    schema: "./src/lib/server/db/schema",
    dialect: "sqlite",
    dbCredentials: {
        url: process.env.DB_URL as string
    },
    out: "./src/lib/server/db/migrations"
} satisfies Config;

