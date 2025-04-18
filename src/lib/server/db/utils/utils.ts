import { integer } from "drizzle-orm/sqlite-core";
import { generateRandomString, type RandomReader } from "@oslojs/crypto/random";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const random: RandomReader = {
    read(bytes) {
        crypto.getRandomValues(bytes);
    }
}

const generateId = () => {
    return generateRandomString(random, alphabet, 10);
}

const timestamp = {
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date())
}

const isEqualBuffer = (arr1: Uint8Array, arr2: Uint8Array): boolean => {
    if (arr1.length !== arr2.length) {
        return false
    }

    return arr1.every((value, index) => value === arr2[index])
}

export { timestamp, generateId, isEqualBuffer };