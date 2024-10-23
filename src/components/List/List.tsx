import { useEffect, useMemo, useState } from "react";
import { Input } from "../Input";
import { ListItems } from "../ListItems";
import { ShowMore } from "../ShowMore";
import styles from "./List.module.css";
import { useAsync } from "../../hooks/useAsync";
import { RawData } from "../../types/rawData";
import { fetchPageByPageNumber } from "../../utils/fetchPageByPageNumber";

export const List = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const params = useMemo(() => [page, search], [page, search]);
  const { data, status } = useAsync<RawData>(fetchPageByPageNumber, params);
  const [listItems, setListItems] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const newItems = data?.results ?? [];
    setListItems((prevListItems) => {
      return [...prevListItems, ...newItems];
    });
  }, [data]);

  const isNext = Boolean(data?.next);

  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setListItems([]);
    setPage(1);
  };
  const onReset = () => {
    setSearch("");
    setListItems([]);
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
