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

// 책장 생성 정보
interface BookshelfCreationProps {
  creationRequest: { name: string; isPublic: boolean };
  side: Side;
}

export const createBookshelf = async ({
  creationRequest,
  side,
}: BookshelfCreationProps): Promise<BookshelfDetailResponseSpec> => {
  const response = await getApiClient(side).post<BookshelfDetailResponseSpec>(
    "/api/users/shelves",
    creationRequest
  );

  if (!response.ok) throw response.error;
  if (!response.data) throw new Error("데이터가 존재하지 않음");
  return response.data;
};

export const deleteBookshelf = async ({
  shelfId,
  side,
}: {
  shelfId: string;
  side: Side;
}): Promise<BookshelfDetailResponseSpec> => {
  const response = await getApiClient(side).delete<BookshelfDetailResponseSpec>(
    `/api/users/shelves/${shelfId}`
  );

  if (!response.ok) throw response.error;
  if (!response.data) throw new Error("데이터가 존재하지 않음");
  return response.data;
};

interface BookshelfUpdateProps {
  shelfId: string;
  creationRequest: { name: string; isPublic: boolean };
  side: Side;
}

export const updateBookshelf = async ({
  shelfId,
  creationRequest,
  side,
}: BookshelfUpdateProps): Promise<BookshelfDetailResponseSpec> => {
  const response = await getApiClient(side).PATCH<BookshelfDetailResponseSpec>(
    `/api/users/shelves/${shelfId}`,
    creationRequest
  );

  if (!response.ok) throw response.error;
  if (!response.data) throw new Error("데이터가 존재하지 않음");
  return response.data;
};
