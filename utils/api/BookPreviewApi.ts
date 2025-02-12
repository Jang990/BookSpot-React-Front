interface SearchRequest {
  keyword: string;
  pageNumber: number;
  pageSize: Number;
}

const BOOK_API_URL = "http://localhost:8080/api/books";

export const fetchBooksPreview = async ({
  keyword,
  pageNumber,
  pageSize,
}: SearchRequest) => {
  return await fetch(
    `${BOOK_API_URL}?title=${keyword}&page=${pageNumber}&size=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((response) => {
    if (response.ok) return response.json();
    throw new Error("Network response was not ok");
  });
};
