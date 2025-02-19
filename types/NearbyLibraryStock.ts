export interface NearbyLibraryStock {
  library: Library;
  totalBooksCount: number;
  availableBooks: BookTitle[];
  unavailableBooks: BookTitle[];
}

interface Library {
  libraryId: string;
  libraryName: string;
  distanceMeter: number;
}

export interface BookTitle {
  bookId: string;
  title: string;
}
