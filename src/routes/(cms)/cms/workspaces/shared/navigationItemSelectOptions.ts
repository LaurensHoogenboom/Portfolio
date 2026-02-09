import type { ISelectOption } from "$cmsComponents/atoms/inputs/select.svelte";
import { navigationItems, type INavigationItem } from "../../shared/navigation";

interface INavigationSelectOption extends ISelectOption {
    navigationItem: INavigationItem;
}

const navigationItemSelectOptions: INavigationSelectOption[] = navigationItems.map((nItem) => {
    return {
        title: nItem.title,
        value: nItem.id,
        navigationItem: nItem
    };
});

export { navigationItemSelectOptions }