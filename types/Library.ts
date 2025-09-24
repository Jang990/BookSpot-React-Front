import { Location } from "./Location";

export interface Library {
  id: string;
  name: string;
  location: Location;
  address: string;
  homePage: string;
  closedInfo: string;
  operatingInfo: string;
  supportsLoanStatus: boolean;
  isbnSearchPattern: string | null;
}
