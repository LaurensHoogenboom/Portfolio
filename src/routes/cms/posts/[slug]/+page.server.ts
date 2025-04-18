import { getPostBySlug, updatePost } from '$lib/server/db/cruds/posts';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const post = await getPostBySlug(params.slug);

    return {post: post};
};

export const actions: Actions = {
    update: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        const { id, title, body, tags } = formData as {
            id: string;
            title: string,
            body: string,
            tags: string
        }

        try {
            const updatedPost = await updatePost(id, {title: title, body: body, tags: tags.split(',')});

            return {
                succes: true,
                bookId: updatedPost.id
            }
        } catch (e) {
            const error = e as Error;
            console.log(error);
            return fail(422, { error: error.message });
        }
    }
} satisfies Actions;