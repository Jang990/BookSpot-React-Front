import { Pageable } from "@/types/Pageable";

interface SearchByKeyword {
  keyword: string;
  pageable: Pageable;
}

interface SearchByIds {
  bookIds: string[];
  pageable: Pageable;
}

export const fetchBooksPreview = async ({
  keyword,
  pageable,
}: SearchByKeyword) => {
  const api: string = createApi({ pageable: pageable, keyword: keyword });
  return await fetchTo(api);
};

export const fetchBooksPreviewByIds = async ({
  bookIds,
  pageable,
}: SearchByIds) => {
  const api: string = createApi({ pageable: pageable, bookIds: bookIds });
  return await fetchTo(api);
};

async function fetchTo(api: string) {
  return await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error("Network response was not ok");
  });
}

interface SearchCondition {
  keyword?: string;
  bookIds?: string[];
  pageable: Pageable;
}

const BOOK_API_URL = "http://localhost:8080/api/books";
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
