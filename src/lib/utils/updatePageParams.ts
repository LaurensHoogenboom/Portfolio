import { goto } from "$app/navigation";
import { page } from "$app/state";

const updatePageParams = (newParams: Record<string, number | string>, resetPageIndex: boolean = false) => {
    const url = new URL(page.url);

    for (const [key, value] of Object.entries(newParams)) {
        if (value === undefined || value === '') {
            url.searchParams.delete(key);
        } else {
            url.searchParams.set(key, value.toString());
        }
    }

    if (resetPageIndex) {
        url.searchParams.set('pageIndex', '0');
    }

    goto(url, { replaceState: true, keepFocus: true, noScroll: true });
};

export { updatePageParams }