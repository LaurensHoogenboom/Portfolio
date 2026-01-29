import type { UploadWithMeta } from "$lib/server/db/schema/uploads"
import type { TableConfig } from "$lib/types/dataList"
import { toFullDataTimeString } from "$lib/utils/format/date";

const uploadsTableUIConfig: TableConfig<UploadWithMeta> = {
    title: {
        label: 'Title',
        priority: 1,
        visible: true,
        sortable: true
    },
    fileType: {
        label: 'Type',
        priority: 1,
        visible: true,
        sortable: true,
        format: (val) => val.charAt(0).toUpperCase() + val.slice(1)
    },
    createdAt: {
        label: 'Created At',
        priority: 1,
        visible: true,
        sortable: true,
        format: toFullDataTimeString
    },
    updatedAt: {
        label: 'Updated At',
        priority: 4,
        visible: true,
        sortable: true,
        format: toFullDataTimeString
    },
    isUsed: {
        label: 'In use',
        priority: 5,
        visible: true,
        sortable: true,
        format: (val) => val ? 'true' : 'false'
    },
    renderActions: (row) => ({
        showDelete: !row.isUsed
    })
};

export { uploadsTableUIConfig };