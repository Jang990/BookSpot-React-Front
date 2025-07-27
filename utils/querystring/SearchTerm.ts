import { ReadonlyURLSearchParams } from "next/navigation";

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
