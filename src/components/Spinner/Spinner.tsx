import styles from "./Spiner.module.css";

export const Spinner = () => {
  return <div className={styles["lds-dual-ring"]}></div>;
};
