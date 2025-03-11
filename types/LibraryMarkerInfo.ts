import { Library } from "./Library";
import LibraryStock from "./LibraryStock";

export default interface LibraryMarkerInfo {
  library: Library;
  stock?: LibraryStock;
}
