import { pushState } from '$app/navigation';
import { page } from '$app/state';
import { isPortfolioItemType, type IPortfolioItem, type PortfolioItemType } from '$lib/types/portfolio';

interface IPortfolioState {
    numberOfVisibleItems: number,
    activePortfolioItemId?: string,
    activePortfolioItem?: IPortfolioItem,
    selectedPortfolioItemType: PortfolioItemType
}

export const getPortfolioUrlWithParams = ({ numberOfVisibleItems, activePortfolioItemId, selectedPortfolioItemType }: IPortfolioState): string => {
    return `#portfolio?numberOfVisibleItems=${numberOfVisibleItems}&activePortfolioItemId=${activePortfolioItemId}&selectedPortfolioItemType=${selectedPortfolioItemType}`;
}

export const getPortfolioSearchParams = (searchParams: URLSearchParams): IPortfolioState => {
    return {
        numberOfVisibleItems: parseInt(searchParams.get('numberOfVisibleItems') ?? "4"),
        activePortfolioItemId: searchParams.get('activePortfolioItemId') ?? undefined,
        selectedPortfolioItemType: isPortfolioItemType(searchParams.get('selectedPortfolioItemType') as string)
            ? searchParams.get('selectedPortfolioItemType') as PortfolioItemType
            : 'research'
    }
}

export const getPortfolioState = (): IPortfolioState => {
    return {
        numberOfVisibleItems: page.state.numberOfVisibleItems ?? 4,
        activePortfolioItemId: page.state.activePortfolioItemId,
        selectedPortfolioItemType: page.state.selectedPortfolioItemType ?? 'research'
    }
}

export const openPortfolioItem = (portfolioItem: IPortfolioItem) => {
    const state = getPortfolioState();
    state.activePortfolioItemId = portfolioItem.id;
    state.activePortfolioItem = portfolioItem;
    pushState(getPortfolioUrlWithParams(state), state);
}