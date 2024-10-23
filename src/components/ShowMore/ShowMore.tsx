import { Spinner } from "../Spinner";
import styles from "./ShowMore.module.css";

type ShowMoreProps = {
  incrementPage: () => void;
  status: "loading" | "success" | "error";
  isNext: boolean;
};
export const ShowMore = ({ incrementPage, status, isNext }: ShowMoreProps) => {
  const isLoading = status === "loading";
  return (
    <div className={styles["ShowMoreWrapper"]}>
      <button
        disabled={isLoading || !isNext}
        onClick={incrementPage}
        className={styles["ShowMoreButton"]}
      >
        Показать еще
      </button>
      {isLoading && <Spinner />}
    </div>
  );
};
