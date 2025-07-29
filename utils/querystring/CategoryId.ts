import { parseNumber } from "./QueryString";

export const CATEGORY_QUERY_STRING_KEY = "categoryId";
export const CATEGORY_HISTORY_QUERY_STRING_KEY = "categorySearchHistory";

export function parseCategoryId(queryStrings: {
  [key: string]: string | string[] | undefined;
}): number | null {
  return parseNumber(queryStrings, CATEGORY_QUERY_STRING_KEY);
}

// URL에서 경로 파싱
export function parseCategoryHistory(searchParams: URLSearchParams): number[] {
  const pathParam = searchParams.get(CATEGORY_HISTORY_QUERY_STRING_KEY);
  if (!pathParam) return [];

  return pathParam
    .split(",")
    .map((id) => Number.parseInt(id, 10))
    .filter((id) => !isNaN(id));
}
