import { MIN_SEARCH_TERM_LENGTH, Pageable } from "@/types/Pageable";
import { get } from "./Fetcher";
import { BookPreview } from "@/types/BookPreview";
import { convertBookPreview } from "./ApiResponseConvertor";

export interface SearchCondition {
  keyword?: string | null;
  bookIds?: string[];
  libraryId?: string;
  pageable: Pageable;
}

export interface PagingResult {
  totalPage: number;
  books: BookPreview[];
}

const EMPTY_PAGIN_RESULT: PagingResult = { totalPage: 0, books: [] };

export const findBooksPreview = async (
  searchCond: SearchCondition
): Promise<PagingResult> => {
  const keyword = searchCond.keyword;

  // 방어: 키워드 없거나 길이 2 미만이면 빈배열, 0페이지
  if (!keyword || keyword.length < MIN_SEARCH_TERM_LENGTH) {
    return EMPTY_PAGIN_RESULT;
  } else {
    const json = await fetchBooksPreview(searchCond);
    return {
      totalPage: json.totalPages,
      books: json.books.content.map(convertBookPreview),
    };
  }
};

export const fetchBooksPreview = async (searchCond: SearchCondition) => {
  return get(createApi(searchCond));
};

const BOOK_API_URL = process.env.NEXT_PUBLIC_FRONT_SERVER_URL + "/api/books";
function createApi({
  pageable,
  keyword,
  bookIds,
  libraryId,
}: SearchCondition): string {
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
