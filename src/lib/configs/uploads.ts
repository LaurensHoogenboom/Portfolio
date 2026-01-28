import type { Upload } from "$lib/server/db/schema/uploads"
import type { TableConfig } from "$lib/types/dataList"
import { toFullDataTimeString } from "$lib/utils/format/date";

const uploadsTableUIConfig: TableConfig<Upload> = {
    title: {
        label: 'Title',
        priority: 1,
        visible: true
    },
    fileType: {
        label: 'Type',
        priority: 1,
        visible: true
    },
    createdAt: {
        label: 'Created At',
        priority: 1,
        visible: true,
        format: toFullDataTimeString
    }
};

export { uploadsTableUIConfig };