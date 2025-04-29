import { Pageable } from "@/types/Pageable";
import { get } from "./Fetcher";

interface SearchCondition {
  keyword?: string;
  bookIds?: string[];
  pageable: Pageable;
}

export const fetchBooksPreview = async ({
  keyword,
  bookIds,
  pageable,
}: SearchCondition) => {
  return get(
    createApi({
      pageable: pageable,
      keyword: keyword,
      bookIds: bookIds,
    })
  );
};

const BOOK_API_URL = process.env.NEXT_PUBLIC_API_SERVER_URL + "/api/books";
function createApi({ pageable, keyword, bookIds }: SearchCondition): string {
  if (!keyword && !bookIds) {
    throw new Error("책 검색 시 키워드와 책ID 둘 중 하나는 필수입니다.");
  }

  const url = new URL(BOOK_API_URL);

  if (keyword) url.searchParams.append("title", keyword);
  if (bookIds) url.searchParams.append("bookIds", bookIds.join(","));
  url.searchParams.append("page", pageable.pageNumber.toString());
  url.searchParams.append("size", pageable.pageSize.toString());
  return url.toString();
}
