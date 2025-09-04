import { get } from "./Request";
import { convertLibrary } from "./ApiResponseConvertor";
import { MapBound } from "@/types/MapBound";
import { Library } from "@/types/Library";
import { LibraryResponse, NearByLibraryApiSpec } from "@/types/ApiSpec";

interface Props {
  mapBound: MapBound;
}

interface SingleLibraryProps {
  libraryId: string;
}

export const fetchNearByLibraries = async ({
  mapBound,
}: Props): Promise<Library[]> => {
  const response = await get<NearByLibraryApiSpec>(createApi(mapBound));
  if (!response.ok) throw response.error;
  if (!response.data) return [];
  return response.data.libraries.map(convertLibrary);
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
  const response = await get<LibraryResponse>(api);

  if (!response.ok) throw response.error;
  if (!response.data) throw new Error("데이터가 없음");
  return convertLibrary(response.data);
};
