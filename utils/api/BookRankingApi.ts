import { BookPreview } from "@/types/BookPreview";
import { RankingConditions } from "@/types/BookRankings";
import { convertBookRanking } from "./ApiResponseConvertor";
import { BookRankingsApiSpec } from "@/types/ApiSpec";
import { getApiClient, Side } from "./common/Request_TEMP";

const BOOK_API_URL = "/api/books/rankings";

function createApiPath({ period, gender, age }: RankingConditions): string {
  const params = new URLSearchParams();

  if (period) params.append("period", period.toString());
  if (gender) params.append("gender", gender.toString());
  if (age) params.append("age", age.toString());

  const query = params.toString();
  return query ? `${BOOK_API_URL}?${query}` : BOOK_API_URL;
}

export const fetchBookRankings = async (
  RankingConditions: RankingConditions,
  side: Side
): Promise<BookPreview[]> => {
  const response = await getApiClient(side).get<BookRankingsApiSpec>(
    createApiPath(RankingConditions)
  );
  if (!response.ok) throw response.error;

  if (!response.data) return [];

  return response.data.rankedBooks.map(convertBookRanking);
};
