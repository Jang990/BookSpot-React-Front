export interface BookPagingApiSpec {
  books: {
    content: any[];
    totalElements: number;
  };
  lastScore: string | null;
  lastLoanCount: number | null;
  lastBookId: number | null;
}

export interface BookSearchAfterApiSpec {
  books: any[];
  lastScore: string | null;
  lastLoanCount: number | null;
  lastBookId: number | null;
  totalElements: number;
}
