import { BookPreview } from "./BookPreview";

export interface BookPagingApiSpec {
  books: {
    content: BookPreview[];
    totalElements: number;
  };
  lastScore: string | null;
  lastLoanCount: number | null;
  lastBookId: number | null;
}

export interface BookSearchAfterApiSpec {
  books: BookPreview[];
  lastScore: string | null;
  lastLoanCount: number | null;
  lastBookId: number | null;
  totalElements: number;
}
