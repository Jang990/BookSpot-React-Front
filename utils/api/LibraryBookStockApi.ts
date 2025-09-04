import { LoanInfo } from "@/types/Loan";
import { get } from "./Request";
import { StockLoanStateApiSpec } from "@/types/ApiSpec";
import { convertLoanInfo } from "./ApiResponseConvertor";

interface Props {
  libraryId: string;
  bookIds: string[];
}

export async function fetchStocks(props: Props): Promise<LoanInfo[]> {
  const response = await get<StockLoanStateApiSpec>(createApi(props));
  if (!response.ok) throw response.error;
  if (!response.data) return [];
  return response.data.responses.map(convertLoanInfo);
}

export function createApi({ libraryId, bookIds }: Props): string {
  const STOCK_API_URL =
    process.env.NEXT_PUBLIC_FRONT_SERVER_URL +
    `/api/libraries/${libraryId}/stocks/loan`;

  const url = new URL(STOCK_API_URL);
  url.searchParams.append("bookIds", bookIds.join(","));

  return url.toString();
}
