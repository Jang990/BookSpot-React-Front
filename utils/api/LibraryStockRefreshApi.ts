import { get, post } from "./Fetcher";
import { LoanInfo } from "@/types/Loan";

interface Props {
  stockId: string;
}

export async function refreshStock(props: Props): Promise<LoanInfo> {
  const json = await post(createApi(props));
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

function createApi({ stockId }: Props): string {
  return (
    process.env.NEXT_PUBLIC_FRONT_SERVER_URL +
    `/api/stocks/${stockId}/loan/refresh`
  );
}
