import { LoanInfo } from "@/types/Loan";
import { StockLoanStateApiSpec } from "@/types/ApiSpec";
import { convertLoanInfo } from "./ApiResponseConvertor";
import { getApiClient, Side } from "./common/Request";

interface Props {
  libraryId: string;
  bookIds: string[];
  side: Side;
}

export async function fetchStocks(props: Props): Promise<LoanInfo[]> {
  const response = await getApiClient(props.side).get<StockLoanStateApiSpec>(
    createApiPath(props)
  );
  if (!response.ok) throw response.error;
  if (!response.data) return [];
  return response.data.responses.map(convertLoanInfo);
}

export function createApiPath({ libraryId, bookIds }: Props): string {
  const baseUrl = `/api/libraries/${libraryId}/stocks/loan`;

  const params = new URLSearchParams();

  if (bookIds?.length) {
    params.append("bookIds", bookIds.join(","));
  }

  const query = params.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
}
