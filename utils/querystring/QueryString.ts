import { ReadonlyURLSearchParams } from "next/navigation";

export function toRawQueryString(
  searchParams: Record<string, string | string[] | undefined>
): string {
  const queryObject = Object.entries(searchParams).reduce(
    (acc, [key, val]) => {
      if (typeof val === "string") {
        acc[key] = val;
      } else if (Array.isArray(val)) {
        acc[key] = val[0] ?? "";
      }
      return acc;
    },
    {} as Record<string, string>
  );

  const qs = new URLSearchParams(queryObject).toString();

  // ex) "searchTerm=한강&page=..."
  return qs ? `${qs}` : "";
}

const FIRST_PAGE = 1;
const PAGE_QUERY_STRING_KEY = "page";
export function parsePage(queryStrings: {
  [key: string]: string | string[] | undefined;
}): number {
  const page = parseNumber(queryStrings, PAGE_QUERY_STRING_KEY);
  if (page === null || page < FIRST_PAGE) return FIRST_PAGE;
  return page;
}

export function parseNumber(
  queryStrings: {
    [key: string]: string | string[] | undefined;
  },
  key: string
): number | null {
  const rawPage = queryStrings[key];
  if (!rawPage || Array.isArray(rawPage) || Number.isNaN(rawPage)) return null;

  return Number.parseInt(rawPage, 10);
}

export const SEARCH_TERM_KEY = "searchTerm";
export function parseSearchTermInClient(
  queryStrings: ReadonlyURLSearchParams
): string {
  const rawSearchTerm = queryStrings.get(SEARCH_TERM_KEY);
  return !rawSearchTerm || Array.isArray(rawSearchTerm) ? "" : rawSearchTerm;
}

export function parseSearchTerm(queryStrings: {
  [key: string]: string | string[] | undefined;
}): string {
  const rawSearchTerm = queryStrings[SEARCH_TERM_KEY];
  return !rawSearchTerm || Array.isArray(rawSearchTerm) ? "" : rawSearchTerm;
}
