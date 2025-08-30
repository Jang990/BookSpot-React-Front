import { convertLoanInfo } from "./ApiResponseConvertor";
import { post } from "./Fetcher";
import { LoanInfo } from "@/types/Loan";

interface Props {
  stockId: string;
}

export async function refreshStock(props: Props): Promise<LoanInfo> {
  const json = await post(createApi(props));
  return convertLoanInfo(json);
}

function createApi({ stockId }: Props): string {
  return (
    process.env.NEXT_PUBLIC_FRONT_SERVER_URL +
    `/api/stocks/${stockId}/loan/refresh`
  );
}
