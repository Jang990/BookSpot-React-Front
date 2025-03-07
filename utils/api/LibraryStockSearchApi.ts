import { NearbyLibraryStock } from "@/types/NearbyLibraryStock";
import { get } from "./Fetcher";
import { convertLibraryStock } from "./ApiResponseConvertor";
import { MapBound } from "@/types/MapBound";

interface Props {
  bookIds: string[];
  mapBound: MapBound;
}

export const fetchNearByLibraryStock = async ({
  bookIds = [],
  mapBound,
}: Props): Promise<NearbyLibraryStock[]> => {
  const api: string = createApi(bookIds, mapBound);
  return get(api);
};

const BOOK_API_URL = "http://localhost:8080/api/libraries/stocks";
function createApi(bookIds: string[], { nw, se }: MapBound): string {
  const url = new URL(BOOK_API_URL);

  if (bookIds) url.searchParams.append("bookIds", bookIds.join(","));
  url.searchParams.append("nwLat", nw.latitude.toString());
  url.searchParams.append("nwLon", nw.longitude.toString());
  url.searchParams.append("seLat", se.latitude.toString());
  url.searchParams.append("seLon", se.longitude.toString());

  return url.toString();
}
