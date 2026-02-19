// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { User } from "$lib/server/db/schema/users";
import type { IPortfolioItem, PortfolioItemType } from "$lib/types/portfolio";

declare global {
	namespace App {
		// interface Error {}
		
		interface Locals {
			currentUser: User;
			adminCount?: number;
		}

		// interface PageData {}
		
		interface PageState {
			activePortfolioItemId?: string;
			activePortfolioItem?: IPortfolioItem;
			selectedPortfolioItemType?: PortfolioItemType;
			numberOfVisibleItems?: number;
		}

		// interface Platform {}
	}
}

export { pageState };