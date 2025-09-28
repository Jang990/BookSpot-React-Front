import { BookshelfDetailResponseSpec } from "@/types/ApiSpec";
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

// 책장 상세정보
interface BookshelfDetailProps {
  shelfId: string;
  side: Side;
}

const createBookshelfDetailApiPath = (shelfId: string) => {
  return `/api/shelves/${shelfId}`;
};

export const fetchBookshelfDetail = async ({
  shelfId,
  side,
}: BookshelfDetailProps): Promise<BookshelfDetailResponseSpec | null> => {
  const response = await getApiClient(side).get<BookshelfDetailResponseSpec>(
    createBookshelfDetailApiPath(shelfId)
  );

  if (!response.ok) throw response.error;
  if (!response.data) return null;
  return response.data;
};
