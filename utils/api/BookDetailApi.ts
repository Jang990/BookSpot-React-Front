import { get } from "./Fetcher";

export const fetchBooksDetail = async (bookId: string) => {
  return get(process.env.NEXT_PUBLIC_FRONT_SERVER_URL + "/api/books/" + bookId);
};
