import { LoanInfo } from "@/types/Loan";
import { get } from "./Fetcher";

interface Props {
  libraryId: string;
  bookIds: string[];
}

export async function fetchStocks(props: Props): Promise<LoanInfo[]> {
  const json = await get(createApi(props));
  return json.responses.map((data: any) => {
    return {
      stockId: data.stockId,
      libraryId: data.libraryId,
      bookId: data.bookId,
      loanState: data.loanState,
      updatedAt: data.stateUpdatedAt,
    };
  });
}

export function createApi({ libraryId, bookIds }: Props): string {
  const STOCK_API_URL =
    process.env.NEXT_PUBLIC_FRONT_SERVER_URL +
    `/api/libraries/${libraryId}/stocks/loan`;

  const url = new URL(STOCK_API_URL);
  url.searchParams.append("bookIds", bookIds.join(","));

  return url.toString();
}
