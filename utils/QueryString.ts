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
  const rawPage = queryStrings[PAGE_QUERY_STRING_KEY];
  if (!rawPage || Array.isArray(rawPage)) return FIRST_PAGE;

  const parsed = Number.parseInt(rawPage, 10);
  if (Number.isNaN(parsed) || parsed < FIRST_PAGE) return FIRST_PAGE;

  return parsed;
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
