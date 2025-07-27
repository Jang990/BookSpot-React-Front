import { parseNumber } from "./QueryString";

export const CATEGORY_QUERY_STRING_KEY = "categoryId";
export function parseCategoryId(queryStrings: {
  [key: string]: string | string[] | undefined;
}): number | null {
  return parseNumber(queryStrings, CATEGORY_QUERY_STRING_KEY);
}
