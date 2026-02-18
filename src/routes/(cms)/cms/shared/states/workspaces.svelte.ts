import type { Workspace } from "$lib/server/db/schema/workspaces";
import type { UserType } from "$lib/types/users";
import { navigationItems, type IPrimaryPageAction } from "../navigation";

class WorkSpaceState {
    userType = $state<UserType>("default");
    userWorkspaces = $state<Workspace[]>([]);
    workSpaceSelectOptions = $derived(this.userWorkspaces.map((w) => ({ title: w.title, value: w.id })));

    currentWorkspaceId = $state<string | undefined>(undefined);
    currentWorkspace = $derived(this.userWorkspaces.find(w => w.id == this.currentWorkspaceId));

    accessibleNavItems = $derived.by(() => {
        const items = this.currentWorkspace?.navigationItems?.length
            ? this.currentWorkspace.navigationItems
            : navigationItems;

        return items
            .filter(n => n.requiredUserType !== 'admin' || this.userType == 'admin')
            .map(item => {
                return {
                    ...item,
                    dashboardQuickAction: navigationItems.find(n => n.id == item.id)?.dashboardQuickAction
                }
            });
    });

    quickActions = $derived(
        this.accessibleNavItems
            .map(n => n.dashboardQuickAction)
            .filter((n): n is IPrimaryPageAction => !!n)
    );
}

export const currentWorkspace = new WorkSpaceState();