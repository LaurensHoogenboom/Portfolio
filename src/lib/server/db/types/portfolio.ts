type PortfolioItemType = 'research' | 'art' | 'project';

interface PortfolioItemThumbnail {
    url: string,
    aspectRatio: '3/4' | '4/3';
}

interface PortfolioItemImage {
    url: string,
    thumbnail: PortfolioItemThumbnail,
}

interface IPortfolioItem {
    id: string;
    type: PortfolioItemType;
    title: string;
    description?: string;
    thumbnail: PortfolioItemThumbnail;
}

export type { PortfolioItemType, PortfolioItemThumbnail, PortfolioItemImage, IPortfolioItem };