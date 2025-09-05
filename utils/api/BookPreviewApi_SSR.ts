import {
  ITEMS_PER_PAGE,
  MIN_SEARCH_TERM_LENGTH,
  Pageable,
  SearchAfter,
} from "@/types/Pageable";
import { BookPreview } from "@/types/BookPreview";
import {
  CATEGORY_LEVEL_QUERY_STRING_KEY,
  CATEGORY_QUERY_STRING_KEY,
} from "../querystring/CategoryId";
import { LAST_SCORE_KEY } from "../querystring/SearchAfter";
import { BookPagingApiSpec, BookSearchAfterApiSpec } from "@/types/ApiSpec";
import { ssrApiClient } from "./common/SsrRequest";

export interface SearchCondition {
  keyword?: string | null;
  bookIds?: string[];
  libraryId?: string;
  categoryCond: CategoryCondition | null;
}

export interface CategoryCondition {
  categoryId: string | null;
  categoryLevel: string | null;
}

export interface PagingResult {
  books: BookPreview[];
  searchAfter: SearchAfter;
  totalElements: number;
  totalPage: number;
  hasNext: boolean;
}

export interface SearchAfterResult {
  books: BookPreview[];
  searchAfter: SearchAfter;
  totalElements: number;
  hasNext: boolean;
}

const EMPTY_PAGIN_RESULT: PagingResult = {
  totalPage: 0,
  totalElements: 0,
  books: [],
  searchAfter: {
    lastLoanCount: null,
    lastScore: null,
    lastBookId: null,
  },
  hasNext: false,
};
const EMPTY_SEARCH_AFTER_RESULT: SearchAfterResult = {
  totalElements: 0,
  books: [],
  searchAfter: {
    lastLoanCount: null,
    lastScore: null,
    lastBookId: null,
  },
  hasNext: false,
};

export const findBooksPreview = async (
  searchCond: SearchCondition,
  pageable: Pageable
): Promise<PagingResult> => {
  const keyword = searchCond.keyword;

  // 방어: 키워드 없거나 길이 2 미만이면 빈배열, 0페이지
  if (keyword && keyword.length < MIN_SEARCH_TERM_LENGTH) {
    return EMPTY_PAGIN_RESULT;
  }

  const response = await ssrApiClient.get<BookPagingApiSpec>(
    createApiPath(searchCond, pageable)
  );

  if (!response.ok) {
    throw response.error;
  }

  if (!response.data || !response.data.books) return EMPTY_PAGIN_RESULT;
  const responseBooks = response.data.books.content;
  const totalElements = response.data.books.totalElements;
  const totalPage = Math.ceil(totalElements / ITEMS_PER_PAGE);

  const responseData = response.data;
  return {
    books: responseBooks,
    searchAfter: {
      lastScore: responseData.lastScore,
      lastLoanCount: responseData.lastLoanCount,
      lastBookId: responseData.lastBookId,
    },
    totalElements,
    totalPage,
    hasNext: responseBooks.length === ITEMS_PER_PAGE,
  };
};

export const findBooksPreviewWithSA = async (
  searchCond: SearchCondition,
  searchAfter: SearchAfter
): Promise<SearchAfterResult> => {
  const keyword = searchCond.keyword;

  // 방어: 키워드 없거나 길이 2 미만이면 빈배열, 0페이지
  if (keyword && keyword.length < MIN_SEARCH_TERM_LENGTH) {
    return EMPTY_PAGIN_RESULT;
  }

  const response = await ssrApiClient.get<BookSearchAfterApiSpec>(
    createApiPath(searchCond, searchAfter)
  );

  if (!response.ok) {
    throw response.error;
  }

  if (!response.data) return EMPTY_SEARCH_AFTER_RESULT;

  const responseData = response.data;
  return {
    totalElements: responseData.totalElements,
    books: responseData.books,
    searchAfter: {
      lastScore: responseData.lastScore,
      lastLoanCount: responseData.lastLoanCount,
      lastBookId: responseData.lastBookId,
    },
    hasNext: responseData.books.length === ITEMS_PER_PAGE,
  };
};

export const BOOK_API_PATH = "/api/books";
function createApiPath(
  { keyword, bookIds, libraryId, categoryCond }: SearchCondition,
  pageCond: Pageable | SearchAfter
): string {
  if (keyword && keyword.length < MIN_SEARCH_TERM_LENGTH) {
    throw new Error("책 검색 시 키워드와 책ID 둘 중 하나는 필수입니다.");
  }
  if (isSearchAfter(pageCond) && pageCond.lastScore && !keyword) {
    throw new Error("관련성 검색은 keyword가 있어야 합니다.");
  }
  if (
    categoryCond &&
    (!categoryCond.categoryId || !categoryCond.categoryLevel)
  ) {
    throw new Error("카테고리 검색 시 카테고리의 ID와 LEVEL은 필수입니다.");
  }

  const params = new URLSearchParams();

  if (keyword) params.append("title", keyword);
  if (bookIds) params.append("bookIds", bookIds.join(","));
  if (libraryId) params.append("libraryId", libraryId);
  if (categoryCond?.categoryId && categoryCond?.categoryLevel) {
    params.append(CATEGORY_QUERY_STRING_KEY, categoryCond.categoryId);
    params.append(CATEGORY_LEVEL_QUERY_STRING_KEY, categoryCond.categoryLevel);
  }

  if (isPageable(pageCond)) appendPageableQueryParams(params, pageCond);
  if (isSearchAfter(pageCond)) appendSearchAfterQueryParams(params, pageCond);

  const query = params.toString();
  return query ? `${BOOK_API_PATH}?${query}` : BOOK_API_PATH;
}

function appendSearchAfterQueryParams(
  params: URLSearchParams,
  pageCond: SearchAfter
) {
  if (pageCond.lastLoanCount !== null)
    params.append("lastLoanCount", pageCond.lastLoanCount.toString());
  if (pageCond.lastBookId !== null)
    params.append("lastBookId", pageCond.lastBookId.toString());
  if (pageCond.lastScore !== null)
    params.append(LAST_SCORE_KEY, pageCond.lastScore.toString());
}

function appendPageableQueryParams(
  params: URLSearchParams,
  pageCond: Pageable
) {
  params.append("page", pageCond.pageNumber.toString());
  params.append("size", pageCond.pageSize.toString());
}

function isPageable(x: Pageable | SearchAfter): x is Pageable {
  return (x as Pageable).pageNumber !== undefined;
}

function isSearchAfter(x: Pageable | SearchAfter): x is SearchAfter {
  return !isPageable(x);
}
