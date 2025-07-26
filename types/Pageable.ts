export const MAX_NUMBER_PAGE = 30;

export const ITEMS_PER_PAGE = 12;
export const FIRST_PAGE = 1;
export const MIN_SEARCH_TERM_LENGTH = 2;

export interface Pageable {
  pageNumber: number;
  pageSize: number;
}

export const EMPTY_SEARCH_AFTER: SearchAfter = {
  lastLoanCount: undefined,
  lastBookId: undefined,
};

export interface SearchAfter {
  lastLoanCount?: number;
  lastBookId?: number;
}
