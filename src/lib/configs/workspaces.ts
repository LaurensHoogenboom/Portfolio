import type { Workspace } from "$lib/server/db/schema/workspaces";
import type { TableConfig } from "$lib/types/dataList";
import { toFullDataTimeString } from "$lib/utils/format/date";

const workspacesTableUIConfig: TableConfig<Workspace> = {
    title: {
        label: 'Title',
        priority: 1,
        visible: true,
        sortable: true,
        maxWidth: 180
    },
    createdAt: {
        label: 'Created At',
        priority: 2,
        visible: true,
        sortable: true,
        format: toFullDataTimeString,
        maxWidth: 150
    },
    updatedAt: {
        label: 'Updated At',
        priority: 3,
        visible: true,
        sortable: true,
        format: toFullDataTimeString,
        maxWidth: 150
    },
    adminRequired: {
        label: 'Admin Required',
        priority: 4,
        visible: true,
        sortable: true,
        format: (val) => val ? 'Yes' : 'No',
        maxWidth: 160
    },
    navigationItems: {
        label: 'Pages',
        priority: 5,
        visible: true,
        sortable: true,
        format: (val) => val && val.length > 0 ? val.map(v => v.title).join(', ') : '-'
    },
    dashboardPreviewDataType: {
        label: "Dashboard Preview Data",
        priority: 6,
        visible: true,
        sortable: true,
        format: (val) => val == 'mostViewedPortfolioItems' ? 'Most viewed portfolio items' : 'Recent Logins'
    }
};

export { workspacesTableUIConfig }