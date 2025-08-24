import { BookPreview } from "@/types/BookPreview";
import { Library } from "@/types/Library";
import LibraryStock from "@/types/LibraryStock";
import {
  BookStockStatus,
  NearbyLibraryStock,
} from "@/types/NearbyLibraryStock";

export function convertBookPreview(content: any): BookPreview {
  return {
    id: content.id,
    title: content.title ?? "제목 없음",
    author: content.author ?? "Unknown",
    isbn13: content.isbn13,
    publicationYear: content.publicationYear ?? /* undefined */ 1111,
    publisher: content.publisher ?? /* undefined */ "Unknown",
    loanCount: content.loanCount,
    category: content.category,
    createdAt: content.createdAt,
  };
}

export function convertBookRanking(content: any): BookPreview {
  return {
    id: content.id,
    title: content.title ?? "제목 없음",
    author: content.author ?? "Unknown",
    isbn13: content.isbn13,
    publicationYear: content.publicationYear ?? /* undefined */ 1111,
    publisher: content.publisher ?? /* undefined */ "Unknown",
    createdAt: content.createdAt,
    category: content.category,

    loanCount: content.loanIncrease,
    // rank: content.rank,
    // loanIncrease: content.loanIncrease,
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
