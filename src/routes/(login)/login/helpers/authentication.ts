import { isEqualBuffer } from "$lib/server/db/utils/utils";
import { db } from "$lib/server/db/client";
import { eq } from "drizzle-orm";
import { users } from "$lib/server/db/schema/users";
import { sha256 } from "@oslojs/crypto/sha2";

const login = async (username: string, password: string) => {
    const user = await db.select().from(users).where(eq(users.username, username)).get();

    if (user && isEqualBuffer(user.password, sha256(Buffer.from(password)))) {
        return {
            userId: user.id,
            username: user.username
        };
    } else {
        throw new Error("Wrong username or password provided.");
    }
}

const resetPassword = async (id: string, newPassword: Uint8Array, securityQuestionAnswer: string) => {
    const user = await db.select().from(users).where(eq(users.id, id)).get();

    if (user && user.securityQuestionAnswer == securityQuestionAnswer) {
        await db.update(users).set({password: newPassword}).where(eq(users.id, id));
    } else {
        throw new Error("Wrong answer to secret question provided.");
    }
}

export { login, resetPassword };