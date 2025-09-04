export interface BookPagingApiSpec {
  books?: {
    content: any[];
    totalElements: number;
  };
  lastScore?: string;
  lastLoanCount?: number;
  lastBookId?: number;
}

export interface BookSearchAfterApiSpec {
  books: any[];
  lastScore?: string;
  lastLoanCount?: number;
  lastBookId?: number;
  totalElements: number;
}
