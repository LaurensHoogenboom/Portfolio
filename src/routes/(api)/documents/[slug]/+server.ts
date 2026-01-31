import { getUploadsFolder } from '$lib/utils/uploads/utils';
import { error } from '@sveltejs/kit';
import { readFileSync } from "node:fs";
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
    const filename = params.slug;
    const path = getUploadsFolder('portfolio') + '/documents/';

    try {
        const file = readFileSync(path + filename);
        return new Response(new Uint8Array(file));
    } catch (e) {
        console.log(e);
        throw error(404, 'File not found.');
    }
};