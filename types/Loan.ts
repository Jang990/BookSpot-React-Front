export interface LibraryBookStockInfo {
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookPublicationYear: string;
  isInLibrary: boolean;
  loanInfo: LoanInfo | null;
}

export type LoanState = "LOANABLE" | "ON_LOAN" | "UNKNOWN" | "ERROR";

export interface LoanInfo {
  stockId: string;
  libraryId: string;
  bookId: string;
  loanState: LoanState;
  updatedAt: string;
}
