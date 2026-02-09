import type { UserType } from "$lib/types/users";

export interface INavigationItem {
    id: string;
    title: string;
    url: string;
    requiredUserType?: UserType;
}

export const navigationItems: INavigationItem[] = [
    { id: '1', title: 'Home', url: '/cms' },
    { id: '2', title: 'Portfolio', url: '/cms/portfolio' },
    { id: '3', title: 'Uploads', url: '/cms/uploads' },
    { id: '4', title: 'Users', url: '/cms/users', requiredUserType: 'admin' },
    { id: '5', title: 'Workspaces', url: '/cms/workspaces', requiredUserType: 'admin' }
];