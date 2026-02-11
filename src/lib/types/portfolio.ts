import type { OutputData } from "@editorjs/editorjs";
import type { IUploadedImage } from "./uploads";

const portfolioTypeStringMap = {
    project: 'project',
    art: 'art',
    research: 'research'
}

type PortfolioItemType = keyof typeof portfolioTypeStringMap;

interface IPortfolioItem {
    id: string;
    type: PortfolioItemType;
    title: string;
    description: string | null;
    image: IUploadedImage | null;
    articleContent: OutputData | null;
    clicks: number
}

const isPortfolioItemType = (value: string): value is PortfolioItemType => {
    return value in portfolioTypeStringMap;
}

export { type PortfolioItemType, type IPortfolioItem, isPortfolioItemType };