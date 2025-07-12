import { NearbyLibraryStock } from "@/types/NearbyLibraryStock";
import { get } from "./Fetcher";
import { convertLibrary } from "./ApiResponseConvertor";
import { MapBound } from "@/types/MapBound";
import { Library } from "@/types/Library";

interface Props {
  mapBound: MapBound;
}

interface SingleLibraryProps {
  libraryId: string;
}

export const fetchNearByLibraries = async ({
  mapBound,
}: Props): Promise<Library[]> => {
  const api: string = createApi(mapBound);
  return get(api).then((content) => content.map(convertLibrary));
};

const BOOK_API_URL =
  process.env.NEXT_PUBLIC_FRONT_SERVER_URL + "/api/libraries";
function createApi({ nw, se }: MapBound): string {
  const url = new URL(BOOK_API_URL);
  url.searchParams.append("nwLat", nw.latitude.toString());
  url.searchParams.append("nwLon", nw.longitude.toString());
  url.searchParams.append("seLat", se.latitude.toString());
  url.searchParams.append("seLon", se.longitude.toString());

  return url.toString();
}

const SINGLE_LIBRARY_API_URL =
  process.env.NEXT_PUBLIC_FRONT_SERVER_URL + "/api/libraries";
export const fetchSingleLibrary = async ({
  libraryId,
}: SingleLibraryProps): Promise<Library> => {
  const api: string = SINGLE_LIBRARY_API_URL.concat("/").concat(libraryId);
  return get(api).then((content) => convertLibrary(content));
};
