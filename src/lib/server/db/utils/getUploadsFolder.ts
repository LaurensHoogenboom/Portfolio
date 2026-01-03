import { dev } from '$app/environment';
import * as dotenv from "dotenv";

export const getUploadsFolder = (type: 'cms' | 'portfolio') => {
    dotenv.config();

    if (dev) {
        return process.env.UPLOADS_FOLDER_DEV + `/${type}/`;
    } else {
        return process.env.UPLOADS_FOLDER + `/${type}/`;
    }
}