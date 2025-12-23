import { type IPortfolioItem } from "./components/organisms/portfolioSection.svelte";

const portfolioSectionState = $state({isFullscreen: false, activePortfolioItem: undefined as IPortfolioItem | undefined });

export { portfolioSectionState }