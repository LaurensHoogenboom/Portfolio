export interface IConfigContext {
    userId?: string
};

export interface UIColumn<V = unknown> {
    label: string,
    priority: number,
    visible: boolean,
    sortable?: boolean,
    maxWidth?: number,
    format?: (value: V) => string | number;
}

export type TableConfig<T> = {
    [K in keyof T]?: UIColumn<T[K]>
} & {
    renderActions?: (row: T, context?: IConfigContext) => {
        showWrite?: boolean;
        showEdit?: boolean;
        showDelete?: boolean
    };
    getLabel?: (row: T) => string;
}

export type SortState<T> = {
    key: keyof T | null;
    direction: 'asc' | 'desc'
}