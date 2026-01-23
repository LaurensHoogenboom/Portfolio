import { getUserById } from "$lib/server/db/cruds/users";
import { error, redirect, type Handle } from "@sveltejs/kit";

const protectedApiRoutes = [
    '/deleteUpload',
    '/updatePortfolioItemArticle',
    '/uploadImage'
]

const protectedPageRoutes = [
    '/cms',
    '/editPortfolioItemArticle'
]

const checkIfUrlStartsWith = (string: string, options: string[]) => {
    return options.some(o => string.startsWith(o));
}

export const handle: Handle = async ({ event, resolve }) => {
    const host = event.url.hostname;
    if (host === 'laurenshoogenboom.nl') {
        throw redirect(301, 'https://www.laurenshoogenboom.nl' + event.url.pathname + event.url.hash + event.url.search);
    }

    const isProtectedPage = checkIfUrlStartsWith(event.url.pathname, protectedPageRoutes);
    const isProtectedApi = checkIfUrlStartsWith(event.url.pathname, protectedApiRoutes);

    if (isProtectedPage || isProtectedApi) {
        const userId = event.cookies.get('userId');
        const user = userId ? await getUserById(userId) : undefined;

        event.locals.username = user ? user.username : '';

        if (isProtectedPage && !user) {
            throw redirect(303, `/login?redirectUrl=${event.url.pathname}`);
        }

        if (isProtectedApi && !user) {
            throw error(401, 'Unauthorized Request');
        }
    }

    const response = await resolve(event);
    response.headers.set('cache-control', 'no-cache');
    return response;
}