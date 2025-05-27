export default interface LibraryStock {
  libraryId: string;
  totalBooksCount: number;
  availableBookIds: string[];
  unavailableBookIds: string[];
}

export const OUT_OF_ZOOM_STOCK: LibraryStock = {
  libraryId: "-1",
  totalBooksCount: -1,
  availableBookIds: [],
  unavailableBookIds: [],
};
