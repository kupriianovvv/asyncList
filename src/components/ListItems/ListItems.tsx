import { useEffect, useMemo, useState } from "react";
import { ListItem } from "../ListItem/ListItem";
import styles from "./ListItems.module.css";
import { useAsync } from "../../hooks/useAsync";
import { fetchPageByPageNumber } from "../../utils/fetchPageByPageNumber";
import { RawData } from "../../types/rawData";

type ListItemsProps = {
  data: any;
};
export const ListItems = ({ data }: ListItemsProps) => {
  const [listItems, setListItems] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const newItems = data?.results ?? [];
    setListItems((prevListItems) => {
      return [...prevListItems, ...newItems];
    });
  }, [data]);

  const renderItems = listItems.map((item) => {
    return <ListItem key={item.name}>{item.name}</ListItem>;
  });

  return <ul className={styles["ListItems"]}>{renderItems}</ul>;
};
