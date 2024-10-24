import { ListItem } from "../ListItem/ListItem";
import styles from "./ListItems.module.css";

type ListItemsProps = {
  listItems: Array<{name: string}>
};
export const ListItems = ({ listItems }: ListItemsProps) => {
  const renderItems = listItems.map((item) => {
    return <ListItem key={item.name}>{item.name}</ListItem>;
  });

  return <ul className={styles["ListItems"]}>{renderItems}</ul>;
};
