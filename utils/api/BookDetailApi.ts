import { get } from "./Fetcher";

export const fetchBooksDetail = async (bookId: string) => {
  return get("http://localhost:8080/api/books/".concat(bookId));
};
