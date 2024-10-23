import { useEffect, useMemo, useState } from "react";
import { ListItem } from "../ListItem/ListItem";
import styles from "./ListItems.module.css";
import { useAsync } from "../../hooks/useAsync";
import { fetchPageByPageNumber } from "../../utils/fetchPageByPageNumber";
import { RawData } from "../../types/rawData";

type ListItemsProps = {
  listItems: any;
};
export const ListItems = ({ listItems }: ListItemsProps) => {
  const renderItems = listItems.map((item) => {
    return <ListItem key={item.name}>{item.name}</ListItem>;
  });

  return <ul className={styles["ListItems"]}>{renderItems}</ul>;
};
