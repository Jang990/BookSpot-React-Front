import {
  BookshelfDetailResponseSpec,
  ShelfBookStatus,
  ShelvesBookStatusResponseSpec,
} from "@/types/ApiSpec";
import { getApiClient, Side } from "./common/Request";
import { BookshelfSummaryListResponseApiSpec as BookshelvesSummaryResponseApiSpec } from "@/types/ApiSpec";
import { ShelfCreationRequest } from "@/types/Bookshelf";
import { Pageable } from "@/types/Pageable";

interface UserBookshelvesProps {
  userId: string;
  side: Side;
}

// TODO: 신고하기 기능과 함께 없앨 것
const TEMP_IS_PUBLIC_FALSE = false;

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
}: BookshelfDetailProps): Promise<BookshelfDetailResponseSpec> => {
  const response = await getApiClient(side).get<BookshelfDetailResponseSpec>(
    createBookshelfDetailApiPath(shelfId)
  );

  if (!response.ok) throw response.error;
  if (!response.data) throw new Error("찾을 수 없는 책장");
  return response.data;
};

// 책장 생성 정보
interface BookshelfCreationProps {
  creationRequest: ShelfCreationRequest;
  side: Side;
}

export const createBookshelf = async ({
  creationRequest,
  side,
}: BookshelfCreationProps): Promise<BookshelfDetailResponseSpec> => {
  const response = await getApiClient(side).post<BookshelfDetailResponseSpec>(
    "/api/users/shelves",
    { ...creationRequest, isPublic: TEMP_IS_PUBLIC_FALSE }
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
}): Promise<void> => {
  const response = await getApiClient(side).delete<BookshelfDetailResponseSpec>(
    `/api/users/shelves/${shelfId}`
  );

  if (!response.ok) throw response.error;
  return;
};

interface BookshelfUpdateProps {
  shelfId: string;
  creationRequest: ShelfCreationRequest;
  side: Side;
}

export const updateBookshelf = async ({
  shelfId,
  creationRequest,
  side,
}: BookshelfUpdateProps): Promise<void> => {
  const response = await getApiClient(side).PATCH<BookshelfDetailResponseSpec>(
    `/api/users/shelves/${shelfId}`,
    { ...creationRequest, isPublic: TEMP_IS_PUBLIC_FALSE }
  );

  if (!response.ok) throw response.error;
};

export const fetchShelfBookStatus = async ({
  bookId,
  side,
}: {
  bookId: string;
  side: Side;
}): Promise<ShelvesBookStatusResponseSpec> => {
  const response = await getApiClient(side).get<ShelvesBookStatusResponseSpec>(
    `/api/users/shelves/books/${bookId}`
  );

  if (!response.ok) throw response.error;
  if (!response.data) return { shelves: [] };
  return response.data;
};

export const fetchPublicBookShelves = async ({
  pageable,
  side,
}: {
  pageable: Pageable;
  side: Side;
}): Promise<BookshelvesSummaryResponseApiSpec> => {
  const response = await getApiClient(
    side
  ).get<BookshelvesSummaryResponseApiSpec>(
    `/api/shelves?pageNumber=${pageable.pageNumber}&pageSize=${pageable.pageSize}`
  );

  if (!response.ok) throw response.error;
  if (!response.data) return { bookshelvesSummary: [] };
  return response.data;
};
