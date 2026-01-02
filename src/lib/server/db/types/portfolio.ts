type PortfolioItemType = 'research' | 'art' | 'project';

interface PortfolioItemThumbnail {
    url: string,
    aspectRatio: number;
}

interface PortfolioItemImage {
    url: string,
    thumbnail: PortfolioItemThumbnail,
}

interface IPortfolioItem {
    id: string;
    type: PortfolioItemType;
    title: string;
    description: string | null;
    image: PortfolioItemImage | null;
}

export type { PortfolioItemType, PortfolioItemThumbnail, PortfolioItemImage, IPortfolioItem };