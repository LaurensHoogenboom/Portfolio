import type { UserType } from "$lib/types/users";

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

const portfolioQuickAction = () => { };
const uploadsQuickAction = () => { };
const usersQuickAction = () => { };
const workspacesQuickAction = () => { };

export const navigationItems: INavigationItem[] = [
    { id: '1', title: 'Dashboard', url: '/cms' },
    { id: '2', title: 'Portfolio', url: '/cms/portfolio', dashboardQuickAction: { title: "Add Portfolio Item", callback: portfolioQuickAction } },
    { id: '3', title: 'Uploads', url: '/cms/uploads', dashboardQuickAction: { title: "Add Upload", callback: uploadsQuickAction } },
    { id: '4', title: 'Users', url: '/cms/users', requiredUserType: 'admin', dashboardQuickAction: { title: "Add User", callback: usersQuickAction } },
    { id: '5', title: 'Workspaces', url: '/cms/workspaces', requiredUserType: 'admin', dashboardQuickAction: { title: "Add Workspace", callback: workspacesQuickAction } }
];