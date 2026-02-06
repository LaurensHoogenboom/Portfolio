import { pushState } from '$app/navigation';
import { page } from '$app/state';
import { isPortfolioItemType, type IPortfolioItem, type PortfolioItemType } from '$lib/types/portfolio';

export const DEFAULT_VISIBLE_COUNT = 4 as const;

interface IPortfolioState {
    numberOfVisibleItems: number,
    activePortfolioItemId?: string,
    activePortfolioItem?: IPortfolioItem,
    selectedPortfolioItemType: PortfolioItemType
}

export const getPortfolioUrlWithParams = ({ numberOfVisibleItems, activePortfolioItemId, selectedPortfolioItemType }: IPortfolioState): string => {
    const params = new URLSearchParams();

    params.set('numberOfVisibleItems', numberOfVisibleItems.toString());
    params.set('selectedPortfolioItemType', selectedPortfolioItemType);

    if (activePortfolioItemId) {
        params.set('activePortfolioItemId', activePortfolioItemId);
    }
    
    return `#portfolio?${params.toString()}`;
}

export const getPortfolioSearchParams = (searchParams: URLSearchParams): IPortfolioState => {
    const typeParam = searchParams.get('selectedPortfolioItemType');
    
    return {
        numberOfVisibleItems: parseInt(searchParams.get('numberOfVisibleItems') ?? DEFAULT_VISIBLE_COUNT.toString()),
        activePortfolioItemId: searchParams.get('activePortfolioItemId') ?? undefined,
        selectedPortfolioItemType: isPortfolioItemType(typeParam ?? '')
            ? (typeParam as PortfolioItemType)
            : 'research'
    }
}

export const getPortfolioState = (): IPortfolioState => {
    return {
        numberOfVisibleItems: page.state.numberOfVisibleItems ?? DEFAULT_VISIBLE_COUNT,
        activePortfolioItemId: page.state.activePortfolioItemId,
        selectedPortfolioItemType: page.state.selectedPortfolioItemType ?? 'research',
        activePortfolioItem: page.state.activePortfolioItem
    }
}

export const openPortfolioItem = (portfolioItem: IPortfolioItem) => {
    const state = getPortfolioState();
    state.activePortfolioItemId = portfolioItem.id;
    state.activePortfolioItem = portfolioItem;
    pushState(getPortfolioUrlWithParams(state), state);
}