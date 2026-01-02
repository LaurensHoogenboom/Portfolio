import type { ISelectOption } from "$lib/components/cms/molecules/labelInputGroup.svelte";
import type { PortfolioItemType } from "$lib/server/db/types/portfolio";

interface ISelectPortfolioType extends ISelectOption {
    title: string;
    value: PortfolioItemType;
}

export const portfolioSelectOptions: ISelectPortfolioType[] = [
    { value: 'art', title: 'Tekening' },
    { value: 'project', title: 'Project' },
    { value: 'research', title: 'Research Through Design' }
];