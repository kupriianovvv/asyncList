import styles from "./ShowMore.module.css";

type ShowMoreProps = {
  onClick: React.MouseEventHandler
  disabled: boolean
};
export const ShowMore = ({ onClick, disabled}: ShowMoreProps) => {
  return (
    <div className={styles["ShowMoreWrapper"]}>
      <button
        disabled={disabled}
        onClick={onClick}
        className={styles["ShowMoreButton"]}
      >
        Показать еще
      </button>
    </div>
  );
};
