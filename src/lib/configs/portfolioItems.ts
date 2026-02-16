import type { TableConfig } from "$lib/types/dataList";
import type { PortfolioItem } from "$lib/server/db/schema/portfolioItems";
import { toFullDataTimeString } from "$lib/utils/format/date";
import { startWithUpperCase } from "$lib/utils/format/text";

const portfolioTableUIConfig: TableConfig<PortfolioItem> = {
    title: {
        label: 'Title',
        priority: 1,
        visible: true,
        sortable: true
    },
    type: {
        label: 'Category',
        priority: 2,
        visible: true,
        sortable: true,
        format: startWithUpperCase,
        maxWidth: 120
    },
    isArticle: {
        label: 'Article',
        priority: 3,
        visible: true,
        sortable: true,
        format: (val) => val ? 'Yes' : 'No',
        maxWidth: 110
    },
    visiblePriority: {
        label: 'Visible priority',
        priority: 4,
        visible: true,
        sortable: true,
        maxWidth: 150
    },
    createdAt: {
        label: 'Created At',
        priority: 5,
        visible: true,
        sortable: true,
        format: toFullDataTimeString,
        maxWidth: 170
    },
    updatedAt: {
        label: 'Updated At',
        priority: 6,
        visible: true,
        sortable: true,
        format: toFullDataTimeString,
        maxWidth: 170
    },
    clicks: {
        label: 'Clicks',
        priority: 7,
        visible: true,
        sortable: true,
        maxWidth: 100
    },
    renderActions: (row) => ({
        showWrite: row.isArticle
    })
}

export { portfolioTableUIConfig }