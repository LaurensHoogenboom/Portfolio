/* eslint-disable @typescript-eslint/no-unused-vars */

import type { RequestHandler } from './$types';
import { dev } from '$app/environment';
import * as dotenv from "dotenv";
import { error } from '@sveltejs/kit';
import { readFileSync } from "node:fs";
import { getUploadsFolder } from '$lib/server/db/utils/getUploadsFolder';

export const GET: RequestHandler = async ({ params }) => {
    dotenv.config();

    const filename = params.slug;
    const path = getUploadsFolder('portfolio') + '/images/';

    try {
        const file = readFileSync(path + filename);
        return new Response(new Uint8Array(file));
    } catch (e) {
        throw error(404, 'file not found')
    }
};