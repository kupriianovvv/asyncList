import { useMemo, useState } from "react";
import { Input } from "../Input";
import { ListItems } from "../ListItems";
import { ShowMore } from "../ShowMore";
import styles from "./List.module.css";
import { useAsync } from "../../hooks/useAsync";
import { RawData } from "../../types/rawData";
import { fetchPageByPageNumber } from "../../utils/fetchPageByPageNumber";

export const List = () => {
  const [page, setPage] = useState(1);

  const params = useMemo(() => [page], [page]);
  const { data, status } = useAsync<RawData>(fetchPageByPageNumber, params);
  const isNext = Boolean(data?.next);

  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <article className={styles.List}>
      <div className={styles["List-Wrapper"]}>
        <Input />
        <ListItems data={data} />
        <ShowMore
          incrementPage={incrementPage}
          status={status}
          isNext={isNext}
        />
      </div>
    </article>
  );
};
