import type { ISelectOption } from "$cmsComponents/molecules/labelInputGroup.svelte";
import type { PortfolioItemType } from "$lib/types/portfolio";

export interface ISelectPortfolioType extends ISelectOption {
    title: string;
    value: PortfolioItemType;
}

export const portfolioSelectOptions: ISelectPortfolioType[] = [
    { value: 'art', title: 'Drawing' },
    { value: 'project', title: 'Design' },
    { value: 'research', title: 'Research Through Design' }
];