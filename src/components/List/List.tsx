import { Input } from "../Input";
import { ListItems } from "../ListItems";
import { ShowMore } from "../ShowMore";
import styles from "./List.module.css";

export const List = () => {
  return (
    <article className={styles.List}>
      <div className={styles["List-Wrapper"]}>
        <Input />
        <ListItems />
        <ShowMore />
      </div>
    </article>
  );
};
