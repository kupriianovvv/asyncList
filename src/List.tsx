import React, { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "./debounce";

export const List = () => {
  const [items, setItems] = useState<Array<{ name: string }> | null>(null);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<"loading" | "error" | "success"
  >("loading");
  const [search, setSearch] = useState("");
  const [isNext, setIsNext] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const incrementPage = () => {
    setStatus("loading");
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setError(null);
    fetch(`https://swapi.dev/api/people/?search=${search}&page=${currentPage}`, {
      signal: controller.signal
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);

        }
        console.log(res);
        return res.json() as Promise<{
          count: number;
          next: string | null;
          previous: string | null;
          results: [{ name: string }];
        }>;
      })
      .then((result) => {
        console.log(result);
        setIsNext(result.next ? true : false);
        setItems((prevItems) => {
          const newItems = [...(prevItems ?? []), ...result.results];
          return newItems;
        });
      })
      .then(() => {
        setStatus("success");
      })
      .catch((err) => {
        if (err.name !== 'AbortError')
        setStatus("error");
        setError(err);
        console.log(err);
      });

    return () => {
      controller.abort();
    };
  }, [currentPage, search]);

  const listItems = items
    ? items.map((item) => <li key={item.name}>{item.name}</li>)
    : null;

  const onChangeHandler = useMemo(() =>debounce((e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
    setItems(null);
  }), []);
  return (
    <div>
      <label style={{ position: "relative" }}>
        <input
          ref={ref}
          onChange={onChangeHandler}
          style={{ height: "30px", width: "200px" }}
        />
        <button
          onClick={() => {
            setSearch("");
            setItems(null);
            setCurrentPage(1);
            if (ref.current) {
              ref.current.value = "";
            }
          }}
          style={{ position: "absolute", right: "5px", top: "0px" }}
        >
          X
        </button>
      </label>

      <button
        disabled={!isNext  || status === "loading"}
        onClick={incrementPage}
      >
        increment Page {currentPage}
      </button>
      {status === "loading" && <div>Loading</div>}
      {status === "error" && <div>Что-то не так</div>}
      {status === "success" && listItems}
    </div>
  );
};
