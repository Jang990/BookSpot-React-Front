export const MAX_NUMBER_PAGE = 50;

export const ITEMS_PER_PAGE = 12;
export const FIRST_PAGE = 1;
export const MIN_SEARCH_TERM_LENGTH = 2;

export type sortBy = "LONA" | "RELEVANCE";

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sortBy?: sortBy;
}

export interface SearchAfter {
  lastScore: string | null;
  lastLoanCount: number | null;
  lastBookId: number | null;
  sortBy?: sortBy;
}
