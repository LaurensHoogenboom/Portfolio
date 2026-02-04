interface IPagingAndSortingParams {
    pageIndex: number,
    itemsPerPage: number,
    sortBy: string | undefined,
    sortDirection: 'asc' | 'desc'
}

const getPagingAndSortingParams = (url: URL): IPagingAndSortingParams => {
    return {
        pageIndex: parseInt(url.searchParams.get('pageIndex') ?? "0"),
        itemsPerPage: parseInt(url.searchParams.get('itemsPerPage') ?? "20"),
        sortDirection: (url.searchParams.get('sortDirection') ?? 'desc') as 'asc' | 'desc',
        sortBy: url.searchParams.get('sortBy') ?? undefined
    }
}

export { getPagingAndSortingParams }