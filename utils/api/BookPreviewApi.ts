import {
  EMPTY_SEARCH_AFTER,
  MIN_SEARCH_TERM_LENGTH,
  Pageable,
  SearchAfter,
} from "@/types/Pageable";
import { get } from "./Fetcher";
import { BookPreview } from "@/types/BookPreview";
import { convertBookPreview } from "./ApiResponseConvertor";

export interface SearchCondition {
  keyword?: string | null;
  bookIds?: string[];
  libraryId?: string;
}

export interface PagingResult {
  books: BookPreview[];
  searchAfter: SearchAfter;
  totalElements: number;
  totalPage: number;
}

export interface SearchAfterResult {
  books: BookPreview[];
  searchAfter: SearchAfter;
  totalElements: number;
}

const EMPTY_PAGIN_RESULT: PagingResult = {
  totalPage: 0,
  totalElements: 0,
  books: [],
  searchAfter: EMPTY_SEARCH_AFTER,
};

export const findBooksPreview = async (
  searchCond: SearchCondition,
  pageable: Pageable
): Promise<PagingResult> => {
  const keyword = searchCond.keyword;

  // 방어: 키워드 없거나 길이 2 미만이면 빈배열, 0페이지
  if (!keyword || keyword.length < MIN_SEARCH_TERM_LENGTH) {
    return EMPTY_PAGIN_RESULT;
  }

  const json = await fetchBooksPreview(searchCond, pageable);

  return {
    totalPage: json.books.totalPages,
    totalElements: json.books.totalElements,
    books: json.books.content.map(convertBookPreview),
    searchAfter: {
      lastLoanCount: json.lastLoanCount,
      lastBookId: json.lastBookId,
    },
  };
};

export const findBooksPreviewWithSA = async (
  searchCond: SearchCondition,
  searchAfter: SearchAfter
): Promise<SearchAfterResult> => {
  const keyword = searchCond.keyword;

  // 방어: 키워드 없거나 길이 2 미만이면 빈배열, 0페이지
  if (!keyword || keyword.length < MIN_SEARCH_TERM_LENGTH) {
    return EMPTY_PAGIN_RESULT;
  }

  const json = await fetchBooksPreview(searchCond, searchAfter);

  return {
    totalElements: json.totalElements,
    books: json.books.content.map(convertBookPreview),
    searchAfter: {
      lastLoanCount: json.lastLoanCount,
      lastBookId: json.lastBookId,
    },
  };
};

export const fetchBooksPreview = async (
  searchCond: SearchCondition,
  pagingCond: Pageable | SearchAfter
) => {
  return get(createApi(searchCond, pagingCond));
};

const BOOK_API_URL = process.env.NEXT_PUBLIC_FRONT_SERVER_URL + "/api/books";
function createApi(
  { keyword, bookIds, libraryId }: SearchCondition,
  pageCond: Pageable | SearchAfter
): string {
  if (!keyword && !bookIds) {
    throw new Error("책 검색 시 키워드와 책ID 둘 중 하나는 필수입니다.");
  }
  const url = new URL(BOOK_API_URL);

  if (keyword) url.searchParams.append("title", keyword);
  if (bookIds) url.searchParams.append("bookIds", bookIds.join(","));
  if (libraryId) url.searchParams.append("libraryId", libraryId);

  if (isPageable(pageCond)) appendPageableQuery(url, pageCond);
  if (isSearchAfter(pageCond)) appendSearchAfterQuery(pageCond, url);

  return url.toString();
}

function appendSearchAfterQuery(pageCond: SearchAfter, url: URL) {
  if (pageCond.lastLoanCount !== undefined)
    url.searchParams.append("lastLoanCount", pageCond.lastLoanCount.toString());

  if (pageCond.lastBookId !== undefined)
    url.searchParams.append("lastBookId", pageCond.lastBookId.toString());
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
