export type RawData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string }>;
};
