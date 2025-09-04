import { BookPreview, BookRankingPreview } from "./BookPreview";
import { LoanInfo } from "./Loan";

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

export interface BookRankingsApiSpec {
  rankedBooks: BookRankingPreview[];
}

export interface LibraryResponse {
  libraryId: string;
  libraryName: string;
  latitude: number;
  longitude: number;
  address: string | null;
  homePage: string | null;
  closedInfo: string | null;
  operatingInfo: string | null;
}

export interface NearByLibraryApiSpec {
  libraries: LibraryResponse[];
}

export interface StockLoanStateApiSpec {
  responses: LoanInfo[];
}
