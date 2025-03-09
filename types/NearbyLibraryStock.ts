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
  id: string;
  title: string;
  available: boolean;
}
