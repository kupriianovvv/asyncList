import { useEffect, useMemo, useState } from "react";
import { QueryFn } from "../types/queryFn";
import { useLatest } from "./useLatest";

export const useAsync = <TData, TError = unknown>(
  queryFn: QueryFn<TData>,
  deps: Array<unknown>
) => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [data, setData] = useState<TData[] | null>(null);
  const [error, setError] = useState<TError | null>(null);

  const queryFnRef = useLatest<QueryFn<TData>>(queryFn);

  const isNextAvailable = Boolean(data?.[0]?.next)

  useEffect(() => {
    setStatus("loading");
    const abortController = new AbortController();
    queryFnRef
      .current(...deps, abortController.signal)
      .then((data) => {
        setData([data]);
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });

    return () => {
      abortController.abort();
    };
  }, [deps, queryFnRef]);

  return useMemo(() => {
    return {
      data,
      status,
      error,
      isNextAvailable
    };
  }, [data, status, error, isNextAvailable]);
};
