import { useMemo } from "react";
import { RawData } from "../types/rawData";

export const useFlattenData = (data: RawData[] | null) => {
  return useMemo(() => {
    if (!data) return null;
    return data.flatMap((item) => item.results);
  }, [data]);
};
