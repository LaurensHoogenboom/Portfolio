import { count, eq, getTableColumns } from "drizzle-orm";
import { db } from "../client";
import { users } from "../schema/users";
import { sha256 } from "@oslojs/crypto/sha2";
import { isEqualBuffer } from "../utils/utils";

const getUsers = async (number: number = 20, offset: number = 0) => {
    const { password, securityQuestionAnswer, ...rest } = getTableColumns(users);

    return await db.select({ ...rest }).from(users).limit(number).offset(offset);
}

const getUserById = async (id: string) => {
    const { password, securityQuestionAnswer, ...rest } = getTableColumns(users);

    return await db.select({ ...rest }).from(users).where(eq(users.id, id)).get();
}

const getUserByUsername = async (username: string) => {
    const { password, securityQuestionAnswer, ...rest } = getTableColumns(users);
    const user = db.select({ ...rest }).from(users).where(eq(users.username, username)).get();

    if (user) {
        return user;
    } else {
        throw new Error("Unknown username was provided.");
    }
}

const getUserCount = async () => {
    return await db.select({ count: count() }).from(users).get();
}

const createUser = async (data: typeof users.$inferInsert) => {
    const userWithUsername = await db.select().from(users).where(eq(users.username, data.username)).get();

    if (!userWithUsername) {
        return await db.insert(users).values(data).returning().get();
    } else {
        throw new Error("This username is already in use.");
    }
}

const updateUser = async (id: string, data: Partial<typeof users.$inferInsert>, currentPassword?: string) => {
    const user = await db.select().from(users).where(eq(users.id, id)).get();

    if (data.username && data.username != user?.username) {
        const userWithUsername = await db.select().from(users).where(eq(users.username, data.username)).get();

        if (userWithUsername) {
            throw new Error("This username is already in use.");
        }
    }

    if ((user && isEqualBuffer(user.password, sha256(Buffer.from(currentPassword || "")))) || !data?.password) {
        return await db.update(users).set({ ...data, updatedAt: new Date() }).where(eq(users.id, id)).returning().get();
    } else {
        throw new Error("Incorrect current password was given.");
    }
}

const deleteUser = async (id: string) => {
    await db.delete(users).where(eq(users.id, id));
}



export { getUsers, getUserById, getUserByUsername, getUserCount, createUser, updateUser, deleteUser };