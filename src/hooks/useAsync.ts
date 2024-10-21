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
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<TError | null>(null);
  
  const queryFnRef = useLatest<QueryFn<TData>>(queryFn)

  useEffect(() => {
    setStatus("loading");
    queryFnRef.current(...deps)
      .then((data) => {
        setData(data);
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  }, [deps, queryFnRef]);

  return useMemo(() => {
    return {
      data,
      status,
      error
    }
  }, [data, status, error])
};