import { Input } from "../Input";
import styles from "./List.module.css";

export const List = () => {
  return (
    <article className={styles.List}>
      <div className={styles["List-Wrapper"]}>
        <Input />
      </div>
    </article>
  );
};
