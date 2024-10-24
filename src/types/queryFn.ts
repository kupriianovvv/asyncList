// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryFn<TData> = (...args: Array<any>) => Promise<TData>;
