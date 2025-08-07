import { parseNumber } from "./QueryString";

export const CATEGORY_QUERY_STRING_KEY = "categoryId";
export const CATEGORY_LEVEL_QUERY_STRING_KEY = "categoryLevel";
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

export function getCategoryLevel(depth: number): string {
  switch (depth) {
    case 0:
      return "TOP";
    case 1:
      return "MID";
    case 2:
      return "LEAF";
    default:
      throw new Error("지원하지 않는 카테고리 레벨");
  }
}
