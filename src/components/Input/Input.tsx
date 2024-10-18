import { ResetButton } from "../ResetButton/ResetButton";
import styles from "./Input.module.css";

export const Input = () => {
  return (
    <div style={{ position: "relative" }}>
      <input className={styles["Input"]} />
      <ResetButton />
    </div>
  );
};
