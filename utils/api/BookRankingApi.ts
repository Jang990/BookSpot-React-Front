import { BookPreview } from "@/types/BookPreview";
import { RankingConditions } from "@/types/BookRankings";
import { get } from "./common/Request";
import { convertBookRanking } from "./ApiResponseConvertor";
import { BookRankingsApiSpec } from "@/types/ApiSpec";

const BOOK_API_URL =
  process.env.NEXT_PUBLIC_FRONT_SERVER_URL + "/api/books/rankings";

function createApi({ period, gender, age }: RankingConditions): string {
  const url = new URL(BOOK_API_URL);
  url.searchParams.append("period", period.toString());
  url.searchParams.append("gender", gender.toString());
  url.searchParams.append("age", age.toString());
  return url.toString();
}

export const fetchBookRankings = async (
  RankingConditions: RankingConditions
): Promise<BookPreview[]> => {
  const response = await get<BookRankingsApiSpec>(createApi(RankingConditions));
  if (!response.ok) throw response.error;

  if (!response.data) return [];

  return response.data.rankedBooks.map(convertBookRanking);
};
