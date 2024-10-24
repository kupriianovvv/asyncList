export const fetchPageByPageNumber = <TData>(
  pageNumber: number,
  search: string,
  signal: AbortController["signal"]
) => {
  const data = fetch(
    `https://swapi.dev/api/people/?search=${search}&page=${pageNumber}`,
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
