import LibraryStock from "@/types/LibraryStock";
import { LibraryStocksApiSpec } from "@/types/ApiSpec";
import { getApiClient, Side } from "./common/Request_TEMP";

interface Props {
  libraryIds: string[];
  bookIds: string[];
  side: Side;
}

export const fetchLibraryStock = async (
  props: Props
): Promise<LibraryStock[]> => {
  if (isEmpty(props.libraryIds) || isEmpty(props.bookIds)) {
    throw new Error("필수 조건 누락");
  }

  const response = await getApiClient(props.side).get<LibraryStocksApiSpec>(
    createApiPath(props)
  );
  if (!response.ok) throw response.error;
  if (!response.data) return [];
  return response.data.libraryStocks;
};

const STOCK_API_URI = "/api/libraries/stocks";
function createApiPath({ libraryIds, bookIds }: Props): string {
  const params = new URLSearchParams();

  if (libraryIds?.length) {
    params.append("libraryIds", libraryIds.join(","));
  }
  if (bookIds?.length) {
    params.append("bookIds", bookIds.join(","));
  }

  const query = params.toString();
  return query ? `${STOCK_API_URI}?${query}` : STOCK_API_URI;
}

function isEmpty(array: string[]): boolean {
  return !array || array.length === 0;
}
