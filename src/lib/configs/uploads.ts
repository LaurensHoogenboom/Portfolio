import type { UploadWithMeta } from "$lib/server/db/schema/uploads"
import type { TableConfig } from "$lib/types/dataList"
import { booleanToYesNo } from "$lib/utils/format/boolean";
import { toFullDataTimeString } from "$lib/utils/format/date";
import { startWithUpperCase } from "$lib/utils/format/text";

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
        maxWidth: 80,
        format: startWithUpperCase
    },
    createdAt: {
        label: 'Created At',
        priority: 1,
        visible: true,
        sortable: true,
        format: toFullDataTimeString,
        maxWidth: 150
    },
    updatedAt: {
        label: 'Updated At',
        priority: 4,
        visible: true,
        sortable: true,
        format: toFullDataTimeString,
        maxWidth: 150
    },
    isUsed: {
        label: 'In use',
        priority: 5,
        visible: true,
        sortable: true,
        maxWidth: 80,
        format: booleanToYesNo
    },
    url: {
        label: 'Url',
        priority: 6,
        visible: true,
        sortable: false,
        format: (val) => `<a href="${val}" target="_blank">${val}<a>`
    },
    renderActions: (row) => ({
        showDelete: !row.isUsed
    })
};

export { uploadsTableUIConfig };