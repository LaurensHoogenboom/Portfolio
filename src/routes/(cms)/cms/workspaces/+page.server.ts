import { createWorkspace, deleteWorkspace, getWorkspaceCount, getWorkspaces, updateWorkspace } from '$lib/server/db/cruds/workspaces';
import { fail } from '@sveltejs/kit';
import { getPagingAndSortingParams } from '../shared/getPaginationAndSortingParams';
import { navigationItems, type INavigationItem } from '../shared/navigation';
import type { Actions, PageServerLoad } from './$types';
import type { workspaces } from '$lib/server/db/schema/workspaces';
import type { DashboardPreviewDataType } from '$lib/types/workspaces';

export const load = (async ({ url }) => {
    const { pageIndex, itemsPerPage, sortBy, sortDirection } = getPagingAndSortingParams(url);

    const [workspaces, workspaceCount] = await Promise.all([
        getWorkspaces(itemsPerPage, pageIndex * itemsPerPage, undefined, sortBy, sortDirection),
        getWorkspaceCount(undefined)
    ])

    return { workspaces: workspaces, workspaceCount: workspaceCount };
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        const selectedNavigationItemIds = formData.getAll('navigationItems') as string[];

        const data: typeof workspaces.$inferInsert = {
            title: formData.get('title') as string,
            dashboardPreviewDataType: formData.get('dashboardPreviewDataType') as DashboardPreviewDataType
        }

        data.navigationItems = selectedNavigationItemIds.map(id => {
            return navigationItems.find(n => n.id == id);
        }).filter((item): item is INavigationItem => !!item);

        data.adminRequired = data.navigationItems.some(n => n.requiredUserType == 'admin');

        try {
            const newWorkspace = await createWorkspace(data);
            return { workspaceTitle: newWorkspace.title };
        } catch (e) {
            console.log(e);
            return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
        }
    },

    update: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id') as string;
        const selectedNavigationItemIds = formData.getAll('navigationItems') as string[];

        const update: typeof workspaces.$inferInsert = {
            title: formData.get('title') as string,
            dashboardPreviewDataType: formData.get('dashboardPreviewDataType') as DashboardPreviewDataType
        }

        update.navigationItems = selectedNavigationItemIds.map(id => {
            return navigationItems.find(n => n.id == id);
        }).filter((item): item is INavigationItem => !!item);

        update.adminRequired = update.navigationItems.some(n => n.requiredUserType == 'admin');

        try {
            const updatedWorkspace = await updateWorkspace(id, update);
            return { workspaceTitle: updatedWorkspace.title };
        } catch (e) {
            console.log(e);
            return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
        }
    },

    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id') as string;

        try {
            const deletedWorkspace = await deleteWorkspace(id);
            return { itemName: deletedWorkspace?.title };
        } catch (e) {
            console.log(e);
            return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
        }
    }
}