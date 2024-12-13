import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { QueryFn } from "../types/queryFn";
import { useLatest } from "./useLatest";
import { useUpdateEffect } from "./useUpdateEffect";

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
  const [flag, toggle] = useReducer((x) => !x, false);

  const queryFnRef =
    useLatest<
      QueryFn<
        TData,
        { pageNumber: number; signal: AbortController["signal"] } & TParams
      >
    >(queryFn);
  const depsRef = useRef<TParams | null>(null);

  const isNextAvailable = data
    ? getNextPageParam(data[data.length - 1])
    : undefined;

  const [pageNumber, setPageNumber] = useState(1);
  const getNewPage = () => {
    setPageNumber((prevNumber) => {
      return prevNumber + 1;
    });
  };

  const pageRef = useRef(1);
  useEffect(() => {
    pageRef.current = pageNumber === 1 ? 1 : pageNumber - 1;
  }, [pageNumber]);

  useEffect(() => {
    setPageNumber(1);
    toggle();
  }, [deps]);

  useUpdateEffect(() => {
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
        if (error.name === "AbortError") {
          return;
        }
        setError(error);
        setStatus("error");
      });

    return () => {
      abortController.abort();
    };
  }, [queryFnRef, pageNumber, flag]);

  useEffect(() => {
    depsRef.current = deps;
  }, [deps]);

  return useMemo(() => {
    return {
      data,
      status,
      error,
      isNextAvailable,
      getNewPage,
      pageNumber,
    };
  }, [data, status, error, isNextAvailable, pageNumber]);
};
