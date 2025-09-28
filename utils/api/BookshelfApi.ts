import { getApiClient, Side } from "./common/Request";
import { BookshelfSummaryListResponseApiSpec as BookshelvesSummaryResponseApiSpec } from "@/types/ApiSpec";

interface UserBookshelvesProps {
  userId: string;
  side: Side;
}

const createUserBookshelvesSummaryApiPath = (userId: string) => {
  return `/api/users/${userId}/shelves`;
};

export const fetchUserBookshelvesSummary = async ({
  userId,
  side,
}: UserBookshelvesProps): Promise<BookshelvesSummaryResponseApiSpec> => {
  const response = await getApiClient(
    side
  ).get<BookshelvesSummaryResponseApiSpec>(
    createUserBookshelvesSummaryApiPath(userId)
  );

  if (!response.ok) throw response.error;
  if (!response.data) return { bookshelvesSummary: [] };
  return response.data;
};
