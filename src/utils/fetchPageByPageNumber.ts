export const fetchPageByPageNumber = <TData>({
  pageNumber,
  search,
  signal,
}: {
  pageNumber: number;
  search: string;
  signal: AbortController["signal"];
}) => {
  const data = fetch(
    `https://swapi.py4e.com/api/people/?search=${search}&page=${pageNumber}`,
    {
      signal,
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("something wrong");
      }
      return response.json();
    })
    .then((data: TData) => {
      return data;
    });

  return data;
};
