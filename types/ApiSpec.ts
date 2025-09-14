import { BookPreview, BookRankingPreview } from "./BookPreview";
import LibraryStock from "./LibraryStock";
import { LoanInfo, LoanState } from "./Loan";

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
  supportsLoanStatus: boolean;
}

export interface NearByLibraryApiSpec {
  libraries: LibraryResponse[];
}

export interface StockLoanStateApiSpec {
  responses: LoanInfoResponseApiSpec[];
}

export interface LibraryStocksApiSpec {
  libraryStocks: LibraryStock[];
}

export interface LoanInfoResponseApiSpec {
  stockId: string;
  libraryId: string;
  bookId: string;
  stateUpdatedAt: string;
  loanState: LoanState;
  subjectCode: string | null;
}

export interface UserBagResponseApiSpec {
  bookIds: string[];
}
