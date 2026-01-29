import type { User } from "$lib/server/db/schema/users";
import type { TableConfig } from "$lib/types/dataList";
import { toFullDataTimeString } from "$lib/utils/format/date";

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
    }
};

export { usersTableUIConfig };