import { useState } from "react";
import { Input } from "../Input";
import { ListItems } from "../ListItems";
import { ShowMore } from "../ShowMore";
import styles from "./List.module.css";

export const List = () => {
  const [page, setPage] = useState(1);
  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <article className={styles.List}>
      <div className={styles["List-Wrapper"]}>
        <Input />
        <ListItems page={page} />
        <ShowMore incrementPage={incrementPage} />
      </div>
    </article>
  );
};
