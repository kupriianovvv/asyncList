import { Spinner } from "../Spinner";
import styles from "./ShowMore.module.css";

type ShowMoreProps = {
  incrementPage: () => void;
  status: "loading" | "success" | "error";
};
export const ShowMore = ({ incrementPage, status }: ShowMoreProps) => {
  return (
    <div className={styles['ShowMoreWrapper']}>
      <button onClick={incrementPage} className={styles["ShowMoreButton"]}>
        Показать еще
      </button>
      {status === "loading" && <Spinner />}
    </div>
  );
};
