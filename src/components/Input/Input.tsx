import { ResetButton } from "../ResetButton/ResetButton";
import styles from "./Input.module.css";

type InputProps = {
  search: string;
  onChange: React.ChangeEventHandler;
};
export const Input = ({ search, onChange }: InputProps) => {
  return (
    <div style={{ position: "relative" }}>
      <input className={styles["Input"]} value={search} onChange={onChange}/>
      <ResetButton />
    </div>
  );
};
