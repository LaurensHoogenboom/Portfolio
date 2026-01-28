import type { TableConfig } from "$lib/types/dataList";
import type { PortfolioItem } from "$lib/server/db/schema/portfolioItems";

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
        format: (val) => val.charAt(0).toUpperCase() + val.slice(1)
    },
    visiblePriority: {
        label: 'Visible priority',
        priority: 3,
        visible: true,
        sortable: true
    },
    renderActions: (row) => ({
        showWrite: row.type === 'research' || row.type === 'project'
    })
}

export { portfolioTableUIConfig }