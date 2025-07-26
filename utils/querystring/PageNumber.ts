import { parseNumber } from "./QueryString";

const FIRST_PAGE = 1;
const PAGE_QUERY_STRING_KEY = "page";
export function parsePage(queryStrings: {
  [key: string]: string | string[] | undefined;
}): number {
  const page = parseNumber(queryStrings, PAGE_QUERY_STRING_KEY);
  if (page === null || page < FIRST_PAGE) return FIRST_PAGE;
  return page;
}
