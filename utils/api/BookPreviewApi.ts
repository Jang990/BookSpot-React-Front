import { MIN_SEARCH_TERM_LENGTH, Pageable } from "@/types/Pageable";
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
  totalPage: number;
  totalElements: number;
  lastLoanCount?: number;
  lastBookId?: number;
}

const EMPTY_PAGIN_RESULT: PagingResult = {
  totalPage: 0,
  totalElements: 0,
  books: [],
};

export const findBooksPreview = async (
  searchCond: SearchCondition,
  pageable: Pageable
): Promise<PagingResult> => {
  const keyword = searchCond.keyword;

  // 방어: 키워드 없거나 길이 2 미만이면 빈배열, 0페이지
  if (!keyword || keyword.length < MIN_SEARCH_TERM_LENGTH) {
    return EMPTY_PAGIN_RESULT;
  } else {
    const json = await fetchBooksPreview(searchCond, pageable);

    return {
      totalPage: json.books.totalPages,
      totalElements: json.books.totalElements,
      books: json.books.content.map(convertBookPreview),
      lastLoanCount: json.lastLoanCount,
      lastBookId: json.lastBookId,
    };
  }
};

export const fetchBooksPreview = async (
  searchCond: SearchCondition,
  pageable: Pageable
) => {
  return get(createApi(searchCond, pageable));
};

const BOOK_API_URL = process.env.NEXT_PUBLIC_FRONT_SERVER_URL + "/api/books";
function createApi(
  { keyword, bookIds, libraryId }: SearchCondition,
  pageable: Pageable
): string {
  if (!keyword && !bookIds) {
    throw new Error("책 검색 시 키워드와 책ID 둘 중 하나는 필수입니다.");
  }
  const url = new URL(BOOK_API_URL);

  if (keyword) url.searchParams.append("title", keyword);
  if (bookIds) url.searchParams.append("bookIds", bookIds.join(","));
  if (libraryId) url.searchParams.append("libraryId", libraryId);
  url.searchParams.append("page", pageable.pageNumber.toString());
  url.searchParams.append("size", pageable.pageSize.toString());
  return url.toString();
}
