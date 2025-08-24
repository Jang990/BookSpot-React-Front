import {
  PageTitlAndSubLabel,
  PageTitle,
} from "@/components/molecules/PageTitle";
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

  return (
    <div>
      <PageTitlAndSubLabel
        title="🔥 주간 대출 Top50"
        label={getWeeklyRankingPeriod(new Date("2025-09-09"))}
      />
      <BookPreviewList searchResults={bookRankings} />;
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
