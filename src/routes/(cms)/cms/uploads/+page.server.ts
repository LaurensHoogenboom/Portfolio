import { getUploads } from '$lib/server/db/cruds/uploads';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const uploads = await getUploads(50);
    return { uploads: uploads };
}) satisfies PageServerLoad;