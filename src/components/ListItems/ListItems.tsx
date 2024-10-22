import { useEffect, useMemo, useState } from "react";
import { ListItem } from "../ListItem/ListItem";
import styles from "./ListItems.module.css";
import { useAsync } from "../../hooks/useAsync";
import { fetchPageByPageNumber } from "../../utils/fetchPageByPageNumber";
import { RawData } from "../../types/rawData";
export const ListItems = () => {
  const [page, setPage] = useState(1);
  const params = useMemo(() => [page], [page]);
  const { data, status } = useAsync<RawData>(fetchPageByPageNumber, params);
  const [listItems, setListItems] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const newItems = data?.results ?? [];
    setListItems(prevListItems => {
      return [...prevListItems, ...newItems]
    })
  }, [data])


  if (status === "loading") {
    return <div>loading</div>;
  }

  if (status === "error") {
    return <div>error</div>;
  }

  const renderItems = listItems.map((item) => {
    return <ListItem key={item.name}>{item.name}</ListItem>;
  });

  return <ul className={styles["ListItems"]}>{renderItems}</ul>;
};
