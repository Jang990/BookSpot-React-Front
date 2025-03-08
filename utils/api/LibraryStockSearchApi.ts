import { NearbyLibraryStock } from "@/types/NearbyLibraryStock";
import { get } from "./Fetcher";
import { Location } from "@/types/Location";
import { convertLibraryStock } from "./ApiResponseConvertor";

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
    return content.map(convertLibraryStock);
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
