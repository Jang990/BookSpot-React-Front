import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { BookPreview } from "@/types/BookPreview";
import { validateRankingConditions } from "@/types/BookRankings";
import { fetchBookRankings } from "@/utils/api/BookRankingApi";
import { notFound } from "next/navigation";

export default async function RankingPage({
  params,
}: {
  params: { period: string; gender: string; age: string };
}) {
  const rawParams = await params;
  const rankingParams = validateRankingConditions(rawParams);

  if (rankingParams === null) {
    notFound();
  }

  const bookRankings: BookPreview[] = await fetchBookRankings(rankingParams);

  return <BookPreviewList searchResults={bookRankings} />;
}
