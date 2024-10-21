import { useMemo, useState } from "react";
import { ListItem } from "../ListItem/ListItem";
import styles from "./ListItems.module.css";
import { useAsync } from "../../hooks/useAsync";
import { fetchPageByPageNumber } from "../../utils/fetchPageByPageNumber";
import { RawData } from "../../types/rawData";
export const ListItems = () => {
  const [page, setPage] = useState(1);
  const params = useMemo(() => [page], [page]);
  const { data, status } = useAsync<RawData>(fetchPageByPageNumber, params);

  if (status === "loading") {
    return <div>loading</div>;
  }

  if (status === "error") {
    return <div>error</div>;
  }

  const items = data?.results ?? [];
  const renderItems = items.map((item) => {
    return <ListItem key={item.name}>{item.name}</ListItem>;
  });

  return <ul className={styles["ListItems"]}>{renderItems}</ul>;
};
