import { useEffect, useMemo, useRef, useState } from "react";
import { QueryFn } from "../types/queryFn";
import { useLatest } from "./useLatest";

export const useAsync = <
  TData,
  TParams = Record<string, unknown>,
  TError = unknown,
>(
  queryFn: QueryFn<
    TData,
    { pageNumber: number; signal: AbortController["signal"] } & TParams
  >,
  deps: TParams,
  getNextPageParam: (data: TData) => number | string | null
) => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [data, setData] = useState<TData[] | null>(null);
  const [error, setError] = useState<TError | null>(null);

  const queryFnRef =
    useLatest<
      QueryFn<
        TData,
        { pageNumber: number; signal: AbortController["signal"] } & TParams
      >
    >(queryFn);

  const isNextAvailable = data
    ? getNextPageParam(data[data.length - 1])
    : undefined;

  const [pageNumber, setPageNumber] = useState(1);

  const pageRef = useRef(1);

  const getNewPage = () => {
    setPageNumber((prevNumber) => {
      pageRef.current = prevNumber;
      return prevNumber + 1;
    });
  };

  const resetPage = () => {
    pageRef.current = 1;
    setPageNumber(1);
  };

  useEffect(() => {
    setStatus("loading");
    const abortController = new AbortController();
    queryFnRef
      .current({ pageNumber, signal: abortController.signal, ...deps })
      .then((data) => {
        if (pageNumber === pageRef.current) {
          setData([data]);
        } else {
          setData((prev) => [...(prev ?? []), data]);
        }
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });

    return () => {
      abortController.abort();
    };
  }, [deps, queryFnRef, pageNumber]);

  return useMemo(() => {
    return {
      data,
      status,
      error,
      isNextAvailable,
      getNewPage,
      pageNumber,
      resetPage,
    };
  }, [data, status, error, isNextAvailable, pageNumber]);
};
