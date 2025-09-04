import { LoanInfoResponseApiSpec } from "@/types/ApiSpec";
import { post } from "./common/Request";
import { LoanInfo } from "@/types/Loan";
import { convertLoanInfo } from "./ApiResponseConvertor";

interface Props {
  stockId: string;
}

export async function refreshStock(props: Props): Promise<LoanInfo> {
  const response = await post<LoanInfoResponseApiSpec>(createApi(props));
  if (!response.ok) throw response.error;
  if (!response.data) throw new Error("대출 정보 없음");

  return convertLoanInfo(response.data);
}

function createApi({ stockId }: Props): string {
  return (
    process.env.NEXT_PUBLIC_FRONT_SERVER_URL +
    `/api/stocks/${stockId}/loan/refresh`
  );
}
