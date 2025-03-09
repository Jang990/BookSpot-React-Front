import { Location } from "./Location";

export interface NearbyLibraryStock {
  library: Library;
  availableBooksCount: number;
  unavailableBooksCount: number;
  bookStocks: BookStockStatus[];
}

export interface Library {
  libraryId: string;
  libraryName: string;
  distanceMeter: number;
}

export interface TEMP_Library {
  id: string;
  name: string;
  location: Location;
}

export interface BookStockStatus {
  id: string;
  title: string;
  available: boolean;
}
