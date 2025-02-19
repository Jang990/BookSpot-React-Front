import {
  BookStockStatus,
  NearbyLibraryStock,
} from "@/types/NearbyLibraryStock";
import { get } from "./Fetcher";
import { Location } from "@/types/Location";

interface Props {
  bookIds: string[];
  location: Location;
}

export const fetchNearByLibraryStock = async ({
  bookIds = [],
  location,
}: Props): Promise<NearbyLibraryStock[]> => {
  const api: string = createApi({ bookIds, location });
  return get(api).then((content) => {
    return content.map(convertResponse);
  });
};

const BOOK_API_URL = "http://localhost:8080/api/libraries/stocks";
function createApi({ bookIds, location }: Props): string {
  const url = new URL(BOOK_API_URL);

  if (bookIds) url.searchParams.append("bookIds", bookIds.join(","));
  url.searchParams.append("latitude", location.latitude.toString());
  url.searchParams.append("longitude", location.longitude.toString());
  return url.toString();
}

function convertResponse(content: any): NearbyLibraryStock {
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
}

function convertBookStockStatus(content: any): BookStockStatus {
  return {
    id: content.id,
    title: content.title,
    available: content.available,
  };
}
