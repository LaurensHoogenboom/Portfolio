import { getUserById, getUserCount } from "$lib/server/db/cruds/users";
import { users } from "$lib/server/db/schema/users";
import { error, redirect, type Handle } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

const protectedApiRoutes = [
    '/deleteUpload',
    '/updatePortfolioItemArticle',
    '/uploadImage'
];

const protectedPageRoutes = [
    '/cms',
    '/editPortfolioItemArticle'
];

const adminPages = [
    '/cms/users',
    '/cms/uploads',
    '/cms/workspaces'
];

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
    const isAdminPage = checkIfUrlStartsWith(event.url.pathname, adminPages);

    const userId = event.cookies.get('userId');
    const user = userId ? await getUserById(userId) : undefined;

    if (user) {
        event.locals.username = user ? user.username : undefined;
        event.locals.userId = user ? user.id : undefined;
        event.locals.userType = user ? user.type : undefined;
        event.locals.adminCount = (await getUserCount(eq(users.type, 'admin')))?.count ?? undefined;
    }

    if (isProtectedPage || isProtectedApi) {
        if (isProtectedPage && !user) {
            throw redirect(303, `/login?redirectUrl=${event.url.pathname}`);
        }

        if (isProtectedApi && !user) {
            throw error(401, 'Unauthorized Request');
        }
    }

    if (isAdminPage) {
        if (!user) throw redirect(303, `/login?redirectUrl=${event.url.pathname}`);
        if (user.type != 'admin') throw redirect(303, '/cms');
    }

    const response = await resolve(event);
    response.headers.set('cache-control', 'no-cache');
    return response;
}