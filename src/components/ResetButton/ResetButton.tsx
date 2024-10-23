import styles from "./ResetButton.module.css";

type ResetButtonProps = {
  onClick: () => void;
};
export const ResetButton = ({ onClick }: ResetButtonProps) => {
  return (
    <button onClick={onClick} className={styles["ResetButton"]}>
      X
    </button>
  );
};
