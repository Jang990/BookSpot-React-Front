export interface LibraryBookStockInfo {
  bookId: string;
  bookTitle: string | null;
  bookAuthor: string | null;
  bookPublicationYear: string | null;
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
  subjectCode: string | null;
}
