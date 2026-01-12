import { pushState } from '$app/navigation';
import { page } from '$app/state';
import { isPortfolioItemType, type IPortfolioItem, type PortfolioItemType } from '$lib/types/portfolio';

interface IPortfolioState {
    showAllPortfolioItems: boolean,
    activePortfolioItemId?: string,
    activePortfolioItem?: IPortfolioItem,
    selectedPortfolioCategory?: PortfolioItemType
}

export const getPortfolioUrlWithParams = ({ showAllPortfolioItems, activePortfolioItemId, selectedPortfolioCategory }: IPortfolioState): string => {
    return `#portfolio?showAllPortfolioItems=${showAllPortfolioItems}&activePortfolioItemId=${activePortfolioItemId}&selectedPortfolioCategory=${selectedPortfolioCategory}`;
}

export const getPortfolioSearchParams = (searchParams: URLSearchParams): IPortfolioState => {
    return {
        showAllPortfolioItems: searchParams.get('showAllPortfolioItems') == 'true' ? true : false,
        activePortfolioItemId: searchParams.get('activePortfolioItemId') ?? undefined,
        selectedPortfolioCategory: isPortfolioItemType(searchParams.get('selectedPortfolioCategory') as string)
            ? searchParams.get('selectedPortfolioCategory') as PortfolioItemType
            : undefined
    }
}

export const getPortfolioState = (): IPortfolioState => {
    return {
        showAllPortfolioItems: page.state.showAllPortfolioItems ?? false,
        activePortfolioItemId: page.state.activePortfolioItemId,
        selectedPortfolioCategory: page.state.selectedPortfolioCategory
    }
}

export const openPortfolioItem = (portfolioItem: IPortfolioItem) => {
    const state = getPortfolioState();
    state.activePortfolioItemId = portfolioItem.id;
    state.activePortfolioItem = portfolioItem;
    pushState(getPortfolioUrlWithParams(state), state);
}