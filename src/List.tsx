import React, { useEffect, useRef, useState } from "react";
import { debounce } from "./debounce";

export const List = () => {
  const [items, setItems] = useState<Array<{ name: string }> | null>(null);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [search, setSearch] = useState("");
  const [isNext, setIsNext] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const incrementPage = () => setCurrentPage((prev) => prev + 1);

  useEffect(() => {
    
    setStatus("loading");
    fetch(`https://swapi.dev/api/people/?search=${search}&page=${currentPage}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json() as Promise<{
          count: number;
          next: string | null;
          previous: string | null;
          results: [{ name: string }];
        }>;
      })
      .then((result) => {
        setIsNext(result.next ? true : false)
        setItems((prevItems) => {;
          const newItems = [...(prevItems ?? []), ...result.results];
          return newItems;
        });
      })
      .then(() => {
        setStatus("success");
      })
      .catch((err) => {
        setStatus("error");
        setError(err);
      });

    return () => {
      setStatus("loading");
      setError(null);
    };
  }, [currentPage, search]);

  const listItems = items
    ? items.map((item) => <li key={item.name}>{item.name}</li>)
    : null;

  const onChangeHandler = debounce((e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
    setItems(null);
  });
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
            setStatus('idle')
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
        disabled={!isNext || status === "loading"}
        onClick={incrementPage}
      >
        increment {currentPage}
      </button>
      {status === "idle" && <div>Ждемс</div>}
      {status === "loading" && <div>Loading</div>}
      {status === "error" && <div>{error.message}</div>}
      {status === "success" && listItems}
    </div>
  );
};
