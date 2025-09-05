import { LoanInfoResponseApiSpec } from "@/types/ApiSpec";
import { LoanInfo } from "@/types/Loan";
import { convertLoanInfo } from "./ApiResponseConvertor";
import { getApiClient, Side } from "./common/Request";

interface Props {
  stockId: string;
  side: Side;
}

export async function refreshStock(props: Props): Promise<LoanInfo> {
  const response = await getApiClient(props.side).post<LoanInfoResponseApiSpec>(
    createApiPath(props)
  );
  if (!response.ok) throw response.error;
  if (!response.data) throw new Error("대출 정보 없음");

  return convertLoanInfo(response.data);
}

function createApiPath({ stockId }: Props): string {
  return `/api/stocks/${stockId}/loan/refresh`;
}
