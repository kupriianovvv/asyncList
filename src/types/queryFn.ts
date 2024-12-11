export type QueryFn<TData, TParams> = (args: TParams) => Promise<TData>;
