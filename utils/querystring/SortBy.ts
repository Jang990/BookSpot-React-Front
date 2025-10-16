import { SortBy } from "@/types/Pageable";
import { parseString } from "./QueryString";

export const SORT_BY_QUERY_STRING_KEY = "sortBy";
const LOAN: SortBy = "LONA";
const RELEVANCE: SortBy = "RELEVANCE";

export function parseSortByValue(queryStrings: {
  [key: string]: string | string[] | undefined;
}): SortBy | null {
  const sortByString = parseString(queryStrings, SORT_BY_QUERY_STRING_KEY);
  if (sortByString && isSortByType(sortByString)) {
    return sortByString;
  }
  return null;
}

function isSortByType(val: string): val is SortBy {
  return LOAN === val || RELEVANCE === val;
}
