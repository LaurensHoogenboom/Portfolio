import { page } from "$app/state";
import type { ISelectOption } from "$cmsComponents/atoms/inputs/select.svelte";

const getPresetSelectOption = (selectOptions: ISelectOption[], key: string) => {
    return page.url.searchParams.get(key) && selectOptions.find(so => so.value == page.url.searchParams.get(key))
        ? page.url.searchParams.get(key)
        : 'all';
}

export { getPresetSelectOption }