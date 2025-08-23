import { RankingConditions } from "@/types/BookRankings";

const BOOK_API_URL =
  process.env.NEXT_PUBLIC_FRONT_SERVER_URL + "/api/books/rankings";

export function createApi({ period, gender, age }: RankingConditions): string {
  const url = new URL(BOOK_API_URL);
  url.searchParams.append("period", period.toString());
  url.searchParams.append("gender", gender.toString());
  url.searchParams.append("age", age.toString());
  return url.toString();
}
