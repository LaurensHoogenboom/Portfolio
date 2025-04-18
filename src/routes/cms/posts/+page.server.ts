import { posts } from '$lib/server/db/schema/posts'
import { getPosts, createPost, deletePost } from '$lib/server/db/cruds/posts';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
    const posts = await getPosts();

    return {
        posts: posts
    }
}

export const actions: Actions = {
    create: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        const { title, slug, body, tags } = formData as {
            title: string;
            slug: string;
            body: string;
            tags: string;
        };

        const post: typeof posts.$inferInsert = {
            title: title,
            slug: slug,
            body: body,
            tags: tags.split(',')
        };

        try {
            const newPost = await createPost(post);

            return {
                succes: true,
                bookId: newPost.id
            }
        } catch (e) {
            const error = e as Error;
            console.log(error);
            return fail(422, { error: error.message });
        }
    },

    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id') as string;

        try {
            await deletePost(id);

            return {
                succes: true
            }
        } catch (e) {
            const error = e as Error;
            console.log(error);
            return fail(422, { error: error.message });
        }
    }
} satisfies Actions;