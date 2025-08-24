import { PageTitlAndSubLabel } from "@/components/molecules/PageTitle";
import { RankingSearchButtons } from "@/components/organisms/ranking/RankingSearchButtons";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { BookPreview } from "@/types/BookPreview";
import {
  RankingPeriodMeta,
  validateRankingConditions,
} from "@/types/BookRankings";
import { fetchBookRankings } from "@/utils/api/BookRankingApi";
import { notFound } from "next/navigation";

export const BASE_URL = "/books/rankings";
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

  const pagePeriodText =
    rankingParams.period === RankingPeriodMeta.MONTHLY.value
      ? RankingPeriodMeta.MONTHLY.text
      : RankingPeriodMeta.WEEKLY.text;

  return (
    <div>
      <PageTitlAndSubLabel
        title={`🔥 ${pagePeriodText} 대출 Top50`}
        label={getWeeklyRankingPeriod(new Date())}
      />
      <RankingSearchButtons rankingConditions={rankingParams} />
      <BookPreviewList searchResults={bookRankings} />
    </div>
  );
}

function getWeeklyRankingPeriod(today: Date): string {
  const day = today.getDay(); // 0=일, 1=월, ... 6=토
  const date = today.getDate();

  const start = new Date(today);
  const end = new Date(today);

  if (day === 1 || day === 2) {
    // 월, 화 → 지난주 화~일
    start.setDate(date - (day + 5)); // 지난주 화
    end.setDate(date - day); // 지난주 일
  } else {
    // 수~일
    start.setDate(date - (day - 2)); // 이번주 화
    end.setDate(date - 1); // 어제까지
  }

  const fmt = (d: Date) => `${d.getMonth() + 1}.${d.getDate()}`;

  return `${fmt(start)} ~ ${fmt(end)}`;
}
