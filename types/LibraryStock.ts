export default interface LibraryStock {
  libraryId: string;
  totalBooksCount: number;
  availableBookIds: string[];
  unavailableBookIds: string[];
}
