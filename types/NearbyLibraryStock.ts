export interface NearbyLibraryStock {
  library: Library;
  availableBooksCount: number;
  unavailableBooksCount: number;
  bookStocks: BookStockStatus[];
}

interface Library {
  libraryId: string;
  libraryName: string;
  distanceMeter: number;
}

export interface BookStockStatus {
  bookId: string;
  title: string;
  available: boolean;
}
