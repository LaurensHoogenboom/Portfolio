import { getPosts } from '$lib/server/db/cruds/posts';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const posts = await getPosts()

    return {posts: posts};
}) satisfies PageServerLoad;