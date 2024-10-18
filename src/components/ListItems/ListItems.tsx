import { ListItem } from "../ListItem/ListItem";
import styles from "./ListItems.module.css";
export const ListItems = () => {
  return (
    <ul className={styles["ListItems"]}>
      <ListItem />
    </ul>
  );
};
