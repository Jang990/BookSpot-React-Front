import { parseNumber } from "./QueryString";

export const LIBRARY_QUERY_STRING_KEY = "libraryId";
export function parseLibraryId(queryStrings: {
  [key: string]: string | string[] | undefined;
}): number | null {
  return parseNumber(queryStrings, LIBRARY_QUERY_STRING_KEY);
}
