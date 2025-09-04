import { BookPreview } from "@/types/BookPreview";
import { Library } from "@/types/Library";
import LibraryStock from "@/types/LibraryStock";
import { LoanInfo } from "@/types/Loan";
import {
  BookStockStatus,
  NearbyLibraryStock,
} from "@/types/NearbyLibraryStock";

export function convertBookPreview(content: any): BookPreview {
  return {
    id: content.id,
    title: content.title,
    isbn13: content.isbn13,
    loanCount: content.loanCount,
    createdAt: content.createdAt,
    author: content.author ?? null,
    publicationYear: content.publicationYear ?? null,
    publisher: content.publisher ?? null,
    category: content.category ?? null,

    rank: null,
  };
}

export function convertBookRanking(content: any): BookPreview {
  return {
    id: content.id,
    title: content.title,
    isbn13: content.isbn13,
    createdAt: content.createdAt,
    author: content.author ?? null,
    publicationYear: content.publicationYear ?? null,
    publisher: content.publisher ?? null,
    category: content.category ?? null,

    loanCount: content.loanIncrease,
    rank: content.rank,
  };
}

export function convertLibrary(content: any): Library {
  return {
    id: content.libraryId,
    name: content.libraryName,
    location: {
      latitude: content.latitude,
      longitude: content.longitude,
    },
    address: content.address,
    homePage: content.homePage,
    closedInfo: content.closedInfo,
    operatingInfo: content.operatingInfo,
  };
}

export function TEMP_convertLibraryStock(content: any): NearbyLibraryStock {
  return {
    library: {
      libraryId: content.library.libraryId,
      libraryName: content.library.libraryName,
      distanceMeter: content.library.distanceMeter,
    },
    availableBooksCount: content.availableBooksCount,
    unavailableBooksCount: content.unavailableBooksCount,
    bookStocks: content.bookStocks.map(convertBookStockStatus),
  };

  function convertBookStockStatus(content: any): BookStockStatus {
    return {
      id: content.id,
      title: content.title,
      available: content.available,
    };
  }
}

export function convertLibraryStock(content: any): LibraryStock {
  return {
    libraryId: content.libraryId,
    availableBookIds: content.availableBookIds,
    unavailableBookIds: content.unavailableBookIds,
    totalBooksCount: content.totalBooksCount,
  };
}

export function convertLoanInfo(content: any): LoanInfo {
  return {
    stockId: content.stockId,
    libraryId: content.libraryId,
    bookId: content.bookId,
    loanState: content.loanState,
    updatedAt: content.stateUpdatedAt,
  };
}
