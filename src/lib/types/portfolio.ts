const portfolioTypeStringMap = {
    project: 'project',
    art: 'art',
    research: 'research'
}

type PortfolioItemType = keyof typeof portfolioTypeStringMap;

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

const isPortfolioItemType = (value: string): value is PortfolioItemType => {
    return value in portfolioTypeStringMap;
}

export { type PortfolioItemType, type PortfolioItemThumbnail, type PortfolioItemImage, type IPortfolioItem, isPortfolioItemType };