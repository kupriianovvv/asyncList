import { ResetButton } from "../ResetButton/ResetButton";
import styles from "./Input.module.css";

type InputProps = {
  search: string;
  onChange: React.ChangeEventHandler;
  onReset: () => void;
};
export const Input = ({ search, onChange, onReset }: InputProps) => {
  return (
    <div style={{ position: "relative" }}>
      <input className={styles["Input"]} value={search} onChange={onChange} />
      <ResetButton onClick={onReset} />
    </div>
  );
};
