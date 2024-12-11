// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryFn<TData, TParams> = (args: TParams) => Promise<TData>;
