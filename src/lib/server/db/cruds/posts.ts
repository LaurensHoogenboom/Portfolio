import { eq } from "drizzle-orm";
import { db } from "../client";
import { posts } from "../schema/posts";

const getPosts = async (number: number = 10, offset: number = 0) => {
    return await db.select().from(posts).limit(number).offset(offset);
}

const getPostById = async (id: string) => {
    return await db.select().from(posts).where(eq(posts.id, id)).get();
}

const getPostBySlug = async (slug: string) => {
    return await db.select().from(posts).where(eq(posts.slug, slug)).get();
}

const getPostTitleById = async (id: string) => {
    return await db
        .select({
            title: posts.title
        })
        .from(posts)
        .where(eq(posts.id, id))
        .get();
}

const createPost = async (data: typeof posts.$inferInsert) => {
    if (!data.title || !data.slug) {
        throw new Error("A post must have a title and a slug.");
    }
    
    const slugExists = await getPostBySlug(data.slug);

    if (slugExists) {
        throw new Error("The slug must be original.");
    }
    
    return await db.insert(posts).values(data).returning().get();
}

const updatePost = async (id: string, data: Partial<typeof posts.$inferInsert>) => {
    const slugExists = data.slug ? await getPostBySlug(data.slug) : false;

    if (slugExists) {
        throw new Error("The slug must be original.");
    }

    return await db.update(posts).set(data).where(eq(posts.id, id)).returning().get();
}

const deletePost = async (id: string) => {
    await db.delete(posts).where(eq(posts.id, id))
}

export {
    createPost,
    getPosts,
    getPostById,
    getPostBySlug,
    getPostTitleById,
    updatePost,
    deletePost
}