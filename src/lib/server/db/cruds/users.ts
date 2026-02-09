import { count, eq, SQL } from "drizzle-orm";
import { db } from "../client";
import { users } from "../schema/users";
import { sha256 } from "@oslojs/crypto/sha2";
import { isEqualBuffer } from "../utils/utils";

const getUsers = async (number: number | 'all' = 20, offset: number = 0, where?: SQL<unknown>, sortBy: string = 'username', sortDirection: 'asc' | 'desc' = 'desc') => {
    return await db.query.users.findMany({
        limit: number != 'all' ? number : undefined,
        columns: { password: false, securityQuestionAnswer: false },
        offset: offset,
        orderBy: (fields, { asc, desc }) => {
            const column = fields[sortBy as keyof typeof fields] ?? fields.username;
            return sortDirection == 'asc' ? [asc(column)] : [desc(column)]
        },
        with: {
            preferredWorkspace: true
        },
        where: where
    })
}

const getUserById = async (id: string) => {
    return await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, id),
        columns: { password: false, securityQuestionAnswer: false },
        with: { preferredWorkspace: true }
    });
}

const getUserByUsername = async (username: string) => {
    return await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.username, username),
        columns: { password: false, securityQuestionAnswer: false },
        with: { preferredWorkspace: true }
    });
}

const getUserCount = async (where?: SQL<unknown>) => {
    return await db.select({ count: count() }).from(users).where(where).get();
}

const createUser = async (data: typeof users.$inferInsert) => {
    const userWithUsername = await db.select().from(users).where(eq(users.username, data.username)).get();

    if (!userWithUsername) {
        const createdUser = await db.insert(users).values(data).returning().get();
        return await getUserById(createdUser.id);
    } else {
        throw new Error("This username is already in use.");
    }
}

const updateUser = async (id: string, data: Partial<typeof users.$inferInsert>, currentPassword?: string) => {
    const user = await db.select().from(users).where(eq(users.id, id)).get();

    if (data.username && data.username != user?.username) {
        const userWithUsername = await getUserByUsername(data.username);

        if (userWithUsername) {
            throw new Error("This username is already in use.");
        }
    }

    if ((user && isEqualBuffer(user.password, sha256(Buffer.from(currentPassword || "")))) || !data?.password) {
        const updatedUser = await db.update(users).set({ ...data, updatedAt: new Date() }).where(eq(users.id, id)).returning().get();
        return await getUserById(updatedUser.id);
    } else {
        throw new Error("Incorrect current password was given.");
    }
}

const deleteUser = async (id: string) => {
    await db.delete(users).where(eq(users.id, id));
}



export { getUsers, getUserById, getUserByUsername, getUserCount, createUser, updateUser, deleteUser };