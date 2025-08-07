import { parseNumber, parseString } from "./QueryString";

export const CATEGORY_QUERY_STRING_KEY = "categoryId";
export const CATEGORY_LEVEL_QUERY_STRING_KEY = "categoryLevel";
export const CATEGORY_HISTORY_QUERY_STRING_KEY = "categorySearchHistory";

const categoryLevels: string[] = ["TOP", "MID", "LEAF"];
const defaultCategoryLevel = categoryLevels[categoryLevels.length - 1];

export function parseCategoryLevel(queryStrings: {
  [key: string]: string | string[] | undefined;
}): string | null {
  const categoryLevel = parseString(
    queryStrings,
    CATEGORY_LEVEL_QUERY_STRING_KEY
  );
  if (categoryLevel === null) return null;
  if (categoryLevels.includes(categoryLevel)) return categoryLevel;
  return defaultCategoryLevel;
}

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
  if (depth < 0 || categoryLevels.length <= depth)
    throw new Error("지원하지 않는 카테고리 레벨");
  return categoryLevels[depth];
}
