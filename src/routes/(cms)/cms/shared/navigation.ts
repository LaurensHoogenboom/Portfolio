import { goto } from "$app/navigation";
import type { UserType } from "$lib/types/users";
import { globalUIState } from "./states/globalUIState.svelte";

export interface IPrimaryPageAction {
    title: string;
    callback: () => void;
}

export interface INavigationItem {
    id: string;
    title: string;
    url: string;
    requiredUserType?: UserType;
    dashboardQuickAction?: IPrimaryPageAction;
}

const portfolioQuickAction = () => {
    goto('/cms/portfolio').then(() => globalUIState.createDialogVisible = true);
};

const uploadsQuickAction = () => {
    goto('/cms/uploads').then(() => globalUIState.createDialogVisible = true);
};

const usersQuickAction = () => {
    goto('/cms/users').then(() => globalUIState.createDialogVisible = true);
};

const workspacesQuickAction = () => {
    goto('/cms/workspaces').then(() => globalUIState.createDialogVisible = true);
};

export const navigationItems: INavigationItem[] = [
    { id: '1', title: 'Dashboard', url: '/cms' },
    { id: '2', title: 'Portfolio', url: '/cms/portfolio', dashboardQuickAction: { title: "Add Portfolio Item", callback: portfolioQuickAction } },
    { id: '3', title: 'Uploads', url: '/cms/uploads', dashboardQuickAction: { title: "Add Upload", callback: uploadsQuickAction } },
    { id: '4', title: 'Users', url: '/cms/users', requiredUserType: 'admin', dashboardQuickAction: { title: "Add User", callback: usersQuickAction } },
    { id: '5', title: 'Workspaces', url: '/cms/workspaces', requiredUserType: 'admin', dashboardQuickAction: { title: "Add Workspace", callback: workspacesQuickAction } }
];