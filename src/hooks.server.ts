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
    const { url, cookies } = event;

    if (url.hostname === 'laurenshoogenboom.nl') {
        throw redirect(301, `https://www.laurenshoogenboom.nl${event.url.pathname}${event.url.search}`);
    }

    const userId = cookies.get('userId');
    const user = userId ? await getUserById(userId) : undefined;

    if (user) {
        event.locals.username = user ? user.username : undefined;
        event.locals.userId = user ? user.id : undefined;
        event.locals.userType = user ? user.type : undefined;
        event.locals.preferredWorkspaceId = user && user.preferredWorkspaceId ? user.preferredWorkspaceId : undefined;

        if (url.pathname.startsWith('/cms')) {
            event.locals.adminCount = (await getUserCount(eq(users.type, 'admin')))?.count ?? undefined;
        }
    }

    const isProtected = checkIfUrlStartsWith(url.pathname, [...protectedPageRoutes, ...protectedApiRoutes]);
    const isAdminRequired = checkIfUrlStartsWith(url.pathname, adminPages);

    if (!user && isProtected) {
        if (checkIfUrlStartsWith(url.pathname, protectedApiRoutes)) throw error(401, 'Unauthorized Request');
        throw redirect(303, `/login?redirectUrl=${url.pathname}`);
    }

    if (isAdminRequired && user?.type !== 'admin') {
        throw redirect(303, user ? '/cms' : '/login');
    }

    const response = await resolve(event);

    if (isProtected || isAdminRequired) response.headers.set('cache-control', 'no-store, no-cache, must-revalidate');

    return response;
}