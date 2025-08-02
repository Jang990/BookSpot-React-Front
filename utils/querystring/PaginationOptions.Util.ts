import { PAGE_QUERY_STRING_KEY } from "./PageNumber";
import {
  LAST_BOOK_ID_KEY,
  LAST_LOAN_COUNT_KEY,
  LAST_SCORE_KEY,
} from "./SearchAfter";

export function deletePaginationOptions(params: URLSearchParams): void {
  params.delete(PAGE_QUERY_STRING_KEY);
  params.delete(LAST_SCORE_KEY);
  params.delete(LAST_BOOK_ID_KEY);
  params.delete(LAST_LOAN_COUNT_KEY);
}
