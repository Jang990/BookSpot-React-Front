export interface BookPagingApiSpec {
  books?: {
    content: any[];
    // [key: string]: any;
    totalElements: number;
  };
  lastScore?: string;
  lastLoanCount?: number;
  lastBookId?: number;
}
