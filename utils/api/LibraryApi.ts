import { convertLibrary } from "./ApiResponseConvertor";
import { MapBound } from "@/types/MapBound";
import { Library } from "@/types/Library";
import { LibraryResponse, NearByLibraryApiSpec } from "@/types/ApiSpec";
import { getApiClient, Side } from "./common/Request_TEMP";

interface Props {
  mapBound: MapBound;
  side: Side;
}

interface SingleLibraryProps {
  libraryId: string;
  side: Side;
}

export const fetchNearByLibraries = async ({
  mapBound,
  side,
}: Props): Promise<Library[]> => {
  const response = await getApiClient(side).get<NearByLibraryApiSpec>(
    createApiPath(mapBound)
  );
  if (!response.ok) throw response.error;
  if (!response.data) return [];
  return response.data.libraries.map(convertLibrary);
};

const BOOK_API_URI = "/api/libraries";

function createApiPath({ nw, se }: MapBound): string {
  const params = new URLSearchParams();

  if (nw?.latitude) params.append("nwLat", nw.latitude.toString());
  if (nw?.longitude) params.append("nwLon", nw.longitude.toString());
  if (se?.latitude) params.append("seLat", se.latitude.toString());
  if (se?.longitude) params.append("seLon", se.longitude.toString());

  const query = params.toString();
  return query ? `${BOOK_API_URI}?${query}` : BOOK_API_URI;
}

export const fetchSingleLibrary = async ({
  libraryId,
  side,
}: SingleLibraryProps): Promise<Library> => {
  const SINGLE_LIBRARY_API_URL = "/api/libraries";
  const api: string = SINGLE_LIBRARY_API_URL.concat("/").concat(libraryId);

  const response = await getApiClient(side).get<LibraryResponse>(api);

  if (!response.ok) throw response.error;
  if (!response.data) throw new Error("데이터가 없음");
  return convertLibrary(response.data);
};
