import { useEffect, useMemo, useState } from "react";
import { Input } from "../Input";
import { ListItems } from "../ListItems";
import { ShowMore } from "../ShowMore";
import styles from "./List.module.css";
import { useAsync } from "../../hooks/useAsync";
import { RawData } from "../../types/rawData";
import { fetchPageByPageNumber } from "../../utils/fetchPageByPageNumber";
import { debounce } from "../../utils/debounce";
import { useUpdateEffect } from "../../hooks/useUpdateEffect";

export const List = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const params = useMemo(() => [page, debouncedSearch], [page, debouncedSearch]);
  const { data, status } = useAsync<RawData>(fetchPageByPageNumber, params);
  const [listItems, setListItems] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const newItems = data?.results ?? [];
    setListItems((prevListItems) => {
      return [...prevListItems, ...newItems];
    });
  }, [data]);

  console.log(debouncedSearch)
  const debouncedSetDebouncedSearch = useMemo(() => debounce((value) => {
    setDebouncedSearch(value)
    setPage(1);
  }, 400), [])
  useUpdateEffect(() => {
      debouncedSetDebouncedSearch(search);
  }, [search])
  useUpdateEffect(() => {
    setListItems([]);
  }, [debouncedSearch])

  const isNext = Boolean(data?.next);

  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const onReset = () => {
    setListItems([]);
    setSearch("");
    setDebouncedSearch("");
    setPage(1);
  };
  return (
    <article className={styles.List}>
      <div className={styles["List-Wrapper"]}>
        <Input search={search} onChange={onChange} onReset={onReset}/>
        <ListItems listItems={listItems} />
        <ShowMore
          incrementPage={incrementPage}
          status={status}
          isNext={isNext}
        />
      </div>
    </article>
  );
};
