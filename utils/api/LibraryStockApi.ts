import LibraryStock from "@/types/LibraryStock";
import { get } from "./common/Request";
import { LibraryStocksApiSpec } from "@/types/ApiSpec";

interface Props {
  libraryIds: string[];
  bookIds: string[];
}

export const fetchLibraryStock = async (
  props: Props
): Promise<LibraryStock[]> => {
  if (isEmpty(props.libraryIds) || isEmpty(props.bookIds)) {
    throw new Error("필수 조건 누락");
  }

  const response = await get<LibraryStocksApiSpec>(createApi(props));
  if (!response.ok) throw response.error;
  if (!response.data) return [];
  return response.data.libraryStocks;
};

const STOCK_API_URL =
  process.env.NEXT_PUBLIC_FRONT_SERVER_URL + "/api/libraries/stocks";
function createApi({ libraryIds, bookIds }: Props): string {
  const url = new URL(STOCK_API_URL);
  url.searchParams.append("libraryIds", libraryIds.join(","));
  url.searchParams.append("bookIds", bookIds.join(","));
  return url.toString();
}

function isEmpty(array: string[]): boolean {
  return !array || array.length === 0;
}
