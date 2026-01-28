export interface UIColumn<V = unknown> {
    label: string,
    priority: number,
    visible: boolean,
    format?: (value: V) => string | number;
}

export type TableConfig<T> = {
    [K in keyof T]?: UIColumn<T[K]>
} & {
    renderActions?: (row: T) => { showWrite?: boolean; showEdit?: boolean }
}