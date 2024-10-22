import styles from './ShowMore.module.css'

type ShowMoreProps = {
  incrementPage: () => void
}
export const ShowMore = ({ incrementPage }: ShowMoreProps) => {
  return <button onClick={incrementPage} className={styles['ShowMoreButton']}>Показать еще</button>;
};
