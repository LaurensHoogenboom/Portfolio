import type { User } from "$lib/server/db/schema/users";
import type { TableConfig } from "$lib/types/dataList";
import { toFullDataTimeString } from "$lib/utils/format/date";
import { startWithUpperCase } from "$lib/utils/format/text";

const usersTableUIConfig: TableConfig<User> = {
    username: {
        label: 'Username',
        priority: 1,
        visible: true,
        sortable: true
    },
    type: {
        label: 'Type',
        priority: 2,
        visible: true,
        sortable: true,
        format: startWithUpperCase,
        maxWidth: 150
    },
    preferredWorkspace: {
        label: 'Preferred Workspace',
        priority: 3,
        visible: true,
        sortable: true,
        format: (v) => v ? v.title : 'None'
    },
    createdAt: {
        label: 'Created At',
        priority: 4,
        visible: true,
        sortable: true,
        format: toFullDataTimeString
    },
    updatedAt: {
        label: 'Updated At',
        priority: 5,
        visible: true,
        sortable: true,
        format: toFullDataTimeString
    },
    lastLogin: {
        label: 'Last login',
        priority: 6,
        visible: true,
        sortable: true,
        format: (val) => val ? toFullDataTimeString(val) : 'None'
    },
    getLabel: (row) => row.username,
    renderActions: (row, context) => {
        const currentUserIsAdmin = context?.userType == 'admin';
        const isNotSelf = context?.userId != row.id;
        const targetIsAdmin = row.type == 'admin';
        const otherAdminsExist = (context?.adminCount || 0) > 1;

        return {
            showDelete: currentUserIsAdmin && isNotSelf && (!targetIsAdmin || otherAdminsExist)
        }
    }
};

export { usersTableUIConfig };