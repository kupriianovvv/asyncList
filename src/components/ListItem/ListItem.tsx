import styles from "./ListItem.module.css";

type ListItemProps = {
  children: string;
};
export const ListItem = ({ children }: ListItemProps) => {
  return <li className={styles["ListItem"]}>{children}</li>;
};
