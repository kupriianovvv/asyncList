import styles from "./ShowMore.module.css";

type ShowMoreProps = {
  incrementPage: () => void;
  status: "loading" | "success" | "error";
};
export const ShowMore = ({ incrementPage, status }: ShowMoreProps) => {
  return (
    <>
    <button onClick={incrementPage} className={styles["ShowMoreButton"]}>
      Показать еще
    </button>
    <div>{status}</div>
    </>
  );
};
