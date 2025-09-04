import {
  ITEMS_PER_PAGE,
  MIN_SEARCH_TERM_LENGTH,
  Pageable,
  SearchAfter,
} from "@/types/Pageable";
import { get } from "./Request";
import { BookPreview } from "@/types/BookPreview";
import { convertBookPreview } from "./ApiResponseConvertor";
import {
  CATEGORY_LEVEL_QUERY_STRING_KEY,
  CATEGORY_QUERY_STRING_KEY,
} from "../querystring/CategoryId";
import { LAST_SCORE_KEY } from "../querystring/SearchAfter";
import { BookPagingApiSpec, BookSearchAfterApiSpec } from "@/types/ApiSpec";

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
    lastLoanCount: undefined,
    lastScore: undefined,
    lastBookId: undefined,
  },
  hasNext: false,
};
const EMPTY_SEARCH_AFTER_RESULT: SearchAfterResult = {
  totalElements: 0,
  books: [],
  searchAfter: {
    lastLoanCount: undefined,
    lastScore: undefined,
    lastBookId: undefined,
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

  const response = await get<BookPagingApiSpec>(
    createApi(searchCond, pageable)
  );

  if (!response.ok) {
    throw response.error;
  }

  if (!response.data || !response.data.books) return EMPTY_PAGIN_RESULT;
  const responseBooks = response.data.books;

  const books: BookPreview[] = responseBooks.content.map(convertBookPreview);
  const totalElements = responseBooks.totalElements;
  const totalPage = Math.ceil(totalElements / ITEMS_PER_PAGE);

  const responseData = response.data;
  return {
    books,
    searchAfter: {
      lastScore: responseData.lastScore,
      lastLoanCount: responseData.lastLoanCount,
      lastBookId: responseData.lastBookId,
    },
    totalElements,
    totalPage,
    hasNext: books.length === ITEMS_PER_PAGE,
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

  const response = await get<BookSearchAfterApiSpec>(
    createApi(searchCond, searchAfter)
  );

  if (!response.ok) {
    throw response.error;
  }

  if (!response.data) return EMPTY_SEARCH_AFTER_RESULT;

  const responseData = response.data;
  const books: BookPreview[] = responseData.books.map(convertBookPreview);
  return {
    totalElements: responseData.totalElements,
    books,
    searchAfter: {
      lastScore: responseData.lastScore,
      lastLoanCount: responseData.lastLoanCount,
      lastBookId: responseData.lastBookId,
    },
    hasNext: responseData.books.length === ITEMS_PER_PAGE,
  };
};

const BOOK_API_URL = process.env.NEXT_PUBLIC_FRONT_SERVER_URL + "/api/books";
function createApi(
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
  const url = new URL(BOOK_API_URL);

  if (keyword) url.searchParams.append("title", keyword);
  if (bookIds) url.searchParams.append("bookIds", bookIds.join(","));
  if (libraryId) url.searchParams.append("libraryId", libraryId);
  if (categoryCond && categoryCond.categoryId && categoryCond.categoryLevel) {
    url.searchParams.append(CATEGORY_QUERY_STRING_KEY, categoryCond.categoryId);
    url.searchParams.append(
      CATEGORY_LEVEL_QUERY_STRING_KEY,
      categoryCond.categoryLevel
    );
  }

  if (isPageable(pageCond)) appendPageableQuery(url, pageCond);
  if (isSearchAfter(pageCond)) appendSearchAfterQuery(pageCond, url);

  return url.toString();
}

function appendSearchAfterQuery(pageCond: SearchAfter, url: URL) {
  if (pageCond.lastLoanCount !== undefined)
    url.searchParams.append("lastLoanCount", pageCond.lastLoanCount.toString());

  if (pageCond.lastBookId !== undefined)
    url.searchParams.append("lastBookId", pageCond.lastBookId.toString());

  if (pageCond.lastScore !== undefined)
    url.searchParams.append(LAST_SCORE_KEY, pageCond.lastScore.toString());
}

function appendPageableQuery(url: URL, pageCond: Pageable) {
  url.searchParams.append("page", pageCond.pageNumber.toString());
  url.searchParams.append("size", pageCond.pageSize.toString());
}

function isPageable(x: Pageable | SearchAfter): x is Pageable {
  return (x as Pageable).pageNumber !== undefined;
}

function isSearchAfter(x: Pageable | SearchAfter): x is SearchAfter {
  return !isPageable(x);
}
