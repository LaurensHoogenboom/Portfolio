// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { IPortfolioItem, PortfolioItemType } from "$lib/types/portfolio";

declare global {
	namespace App {
		// interface Error {}
		
		interface Locals {
			username?: string
		}

		// interface PageData {}
		
		interface PageState {
			activePortfolioItemId?: string;
			activePortfolioItem?: IPortfolioItem;
			selectedPortfolioCategory?: PortfolioItemType;
			showAllPortfolioItems?: boolean;
		}

		// interface Platform {}
	}
}

export { pageState };