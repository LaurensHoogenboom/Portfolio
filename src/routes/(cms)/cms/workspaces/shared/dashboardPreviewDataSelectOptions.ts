import type { ISelectOption } from "$cmsComponents/atoms/inputs/select.svelte";
import type { DashboardPreviewDataType } from "$lib/types/workspaces";

interface IDashboardPreviewDataSelectOption extends ISelectOption {
    value: DashboardPreviewDataType
}

const dashboardPreviewDataTypeSelectOptions: IDashboardPreviewDataSelectOption[] = [
    { title: 'Recent Logins', value: "recentLogins"},
    { title: 'Most viewed Portfolio Items', value: 'mostViewedPortfolioItems'}
]

export { dashboardPreviewDataTypeSelectOptions }