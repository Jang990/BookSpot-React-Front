import { YearRange } from "../api/BookPreviewApi";
import { parseNumber } from "./QueryString";

const DEFAULT_START_VAL = 0;
const DEFAULT_END_VAL = 9999;

export const START_YEAR_QUERY_STRING_KEY = "startYear";
export const END_YEAR_QUERY_STRING_KEY = "endYear";

export const DEFAULT_YEAR_RANGE: YearRange = {
  startYear: DEFAULT_START_VAL,
  endYear: DEFAULT_END_VAL,
};

export function parseYearRange(queryStrings: {
  [key: string]: string | string[] | undefined;
}): YearRange {
  const startYear =
    parseNumber(queryStrings, START_YEAR_QUERY_STRING_KEY) ?? DEFAULT_START_VAL;
  const endYear =
    parseNumber(queryStrings, END_YEAR_QUERY_STRING_KEY) ?? DEFAULT_END_VAL;

  if (startYear < endYear) return { startYear: startYear, endYear: endYear };
  else return DEFAULT_YEAR_RANGE;
}
