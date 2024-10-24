import { ListItem } from "./listItem";

export type RawData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<ListItem>;
};
