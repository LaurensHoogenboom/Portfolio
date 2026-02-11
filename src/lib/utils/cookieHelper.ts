import type { Cookies } from "@sveltejs/kit";

const VIEWED_PORTFOLIO_ITEMS_COOKIE_NAME = 'viewedPortfolioItems';

export const cookieHelper = {
    getViewedPortfolioItems(cookies: Cookies): string[] {
        const items = cookies.get(VIEWED_PORTFOLIO_ITEMS_COOKIE_NAME);

        if (!items) {
            cookies.set(VIEWED_PORTFOLIO_ITEMS_COOKIE_NAME, JSON.stringify([]), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60,
                secure: true
            });
        }

        return items ? JSON.parse(items) : [];
    },
    setViewedPortfolioItems(cookies: Cookies, portfolioItemId: string): boolean {
        const current = this.getViewedPortfolioItems(cookies);

        if (!current.includes(portfolioItemId)) {
            const updated = [...current, portfolioItemId].slice(-50);

            cookies.set(VIEWED_PORTFOLIO_ITEMS_COOKIE_NAME, JSON.stringify(updated), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60,
                secure: true
            });

            return true;
        }
        return false;
    }
}