import { useMemo, useState } from "react";
import { Input } from "../Input";
import { ListItems } from "../ListItems";
import { ShowMore } from "../ShowMore";
import styles from "./List.module.css";
import { useAsync } from "../../hooks/useAsync";
import { RawData } from "../../types/rawData";
import { fetchPageByPageNumber } from "../../utils/fetchPageByPageNumber";
import { debounce } from "../../utils/debounce";
import { useUpdateEffect } from "../../hooks/useUpdateEffect";
import { useFlattenData } from "../../hooks/useFlattenData";
import { Spinner } from "../Spinner";

export const List = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const params = useMemo(
    () => ({ search: debouncedSearch }),
    [debouncedSearch]
  );
  const { data, status, isNextAvailable, getNewPage, resetPage } =
    useAsync<RawData>(fetchPageByPageNumber, params);

  const debouncedSetDebouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setDebouncedSearch(value);
        resetPage();
      }, 400),
    []
  );
  useUpdateEffect(() => {
    debouncedSetDebouncedSearch(search);
  }, [search]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const onReset = () => {
    setSearch("");
    setDebouncedSearch("");
    resetPage();
  };
  const flattenedData = useFlattenData(data);
  return (
    <article className={styles.List}>
      <div className={styles["List-Wrapper"]}>
        <Input search={search} onChange={onChange} onReset={onReset} />
        <ListItems listItems={flattenedData || []} />
        <ShowMore
          onClick={getNewPage}
          disabled={!isNextAvailable || status === "loading"}
        />
        {status === "loading" && <Spinner />}
      </div>
    </article>
  );
};
