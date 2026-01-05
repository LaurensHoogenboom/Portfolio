// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { PortfolioItemType } from "$lib/types/portfolio";

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		
		interface PageState {
			showAllPortfolioItems?: boolean;
			activePortfolioItemId?: string;
			selectedPortfolioCategory?: PortfolioItemType;
		}

		// interface Platform {}
	}
}

export { pageState };