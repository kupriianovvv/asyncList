import styles from "./ShowMore.module.css";

type ShowMoreProps = {
  incrementPage: () => void;
  isNext: boolean;
};
export const ShowMore = ({ incrementPage, isNext }: ShowMoreProps) => {
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
    </div>
  );
};
