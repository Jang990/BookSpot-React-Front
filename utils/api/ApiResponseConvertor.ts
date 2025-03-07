import { BookPreview } from "@/types/BookPreview";
import {
  BookStockStatus,
  NearbyLibraryStock,
} from "@/types/NearbyLibraryStock";

export function convertBookPreview(content: any): BookPreview {
  return {
    id: content.id,
    title: content.title ?? "제목 없음",
    author: content.author ?? "Unknown",
    publicationYear: content.publicationYear ?? /* undefined */ 1111,
    publisher: content.publisher ?? /* undefined */ "Unknown",
  };
}

export function convertLibraryStock(content: any): NearbyLibraryStock {
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
