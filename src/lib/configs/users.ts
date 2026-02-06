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
    createdAt: {
        label: 'Created At',
        priority: 2,
        visible: true,
        sortable: true,
        format: toFullDataTimeString
    },
    updatedAt: {
        label: 'Updated At',
        priority: 3,
        visible: true,
        sortable: true,
        format: toFullDataTimeString
    },
    type: {
        label: 'Type',
        priority: 4,
        visible: true,
        sortable: true,
        format: startWithUpperCase
    },
    getLabel: (row) => row.username,
    renderActions: (row, context) => {
        return {
            showDelete: (
                context &&
                context.adminCount && context.adminCount > 1 &&
                context.userType && context.userType == 'admin' &&
                context.userId && context.userId != row.id
            ) ? true : false
        }
    }
};

export { usersTableUIConfig };