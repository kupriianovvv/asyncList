import { Spinner } from "../Spinner";
import styles from "./ShowMore.module.css";

type ShowMoreProps = {
  incrementPage: () => void;
  status: "loading" | "success" | "error";
};
export const ShowMore = ({ incrementPage, status }: ShowMoreProps) => {
  const isLoading = status === 'loading'
  return (
    <div className={styles['ShowMoreWrapper']}>
      <button disabled={isLoading} onClick={incrementPage} className={styles["ShowMoreButton"]}>
        Показать еще
      </button>
      {isLoading && <Spinner />}
    </div>
  );
};
