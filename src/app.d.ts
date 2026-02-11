// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { IPortfolioItem, PortfolioItemType } from "$lib/types/portfolio";
import type { UserType } from "$lib/types/users";

declare global {
	namespace App {
		// interface Error {}
		
		interface Locals {
			username?: string;
			userId?: string;
			userType?: UserType;
			adminCount?: number;
			preferredWorkspaceId?: string;
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