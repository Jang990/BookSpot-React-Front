import { InfoPanel } from "@/components/molecules/InfoPanel";
import { PageTitlAndSubLabel } from "@/components/molecules/title/PageTitle";
import { RankingSearchButtons } from "@/components/organisms/ranking/RankingSearchButtons";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { BookPreview } from "@/types/BookPreview";
import {
  RankingPeriodMeta,
  validateRankingConditions,
} from "@/types/BookRankings";
import { fetchBookRankings } from "@/utils/api/BookRankingApi";
import { notFound } from "next/navigation";

export default async function RankingPage({
  params,
}: {
  params: Promise<{ period: string; gender: string; age: string }>;
}) {
  const rawParams = await params;
  const rankingParams = validateRankingConditions(rawParams);

  if (rankingParams === null) {
    notFound();
  }

  const bookRankings: BookPreview[] = await fetchBookRankings(
    rankingParams,
    "server"
  );

  const pagePeriodText =
    rankingParams.period === RankingPeriodMeta.MONTHLY.value
      ? RankingPeriodMeta.MONTHLY.text
      : RankingPeriodMeta.WEEKLY.text;

  const periodText =
    rankingParams.period === RankingPeriodMeta.MONTHLY.value
      ? getMonthlyRankingPeriod(new Date())
      : getWeeklyRankingPeriod(new Date());

  return (
    <div>
      <PageTitlAndSubLabel
        title={`🔥 ${pagePeriodText} 대출 Top50`}
        label={periodText}
      />
      <RankingSearchButtons rankingConditions={rankingParams} />
      <BookPreviewList searchResults={bookRankings} />

      <div className="flex justify-center mt-3">
        <InfoPanel text={`화~일요일, 매일 밤 10시 이후 최신화됩니다.`} />
      </div>
    </div>
  );
}

function getWeeklyRankingPeriod(today: Date): string {
  const dayOfWeek = today.getDay(); // 0:일, 1:월, ..., 6:토
  const prevDay = new Date(today);
  prevDay.setDate(today.getDate() - 1);

  let start: Date;
  let end: Date;

  if (dayOfWeek === 1 || dayOfWeek === 2) {
    // 월요일 또는 화요일
    // 전 주 월요일
    start = new Date(today);
    start.setDate(today.getDate() - dayOfWeek - 6);
    // 전 주 일요일
    end = new Date(start);
    end.setDate(start.getDate() + 6);
  } else {
    // 이번 주 월요일
    start = new Date(today);
    start.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
    // 어제
    end = prevDay;
  }

  return `${start.getMonth() + 1}.${start.getDate()} ~ ${end.getMonth() + 1}.${end.getDate()}`;
}

/*
월요일은 집계하지 않음. 1일 월요일이라면 => 전달데이터 기간.
1일이 월요일이라면 2일 화요일도 => 전달 데이터 기간
3일 수요일은 => 이번달 1일 ~ 이번달 2일
*/
function getMonthlyRankingPeriod(today: Date): string {
  const todayDate = today.getDate();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const fmt = (d: Date): string => `${d.getMonth() + 1}.${d.getDate()}`;

  const firstDayOfThisMonth = new Date(currentYear, currentMonth, 1);
  const dayOfFirst = firstDayOfThisMonth.getDay();

  if (todayDate === 1 || (todayDate === 2 && dayOfFirst === 1)) {
    const startOfPreviousMonth = new Date(currentYear, currentMonth - 1, 1);
    const endOfPreviousMonth = new Date(currentYear, currentMonth, 0);
    return `${fmt(startOfPreviousMonth)} ~ ${fmt(endOfPreviousMonth)}`;
  } else {
    const startOfCurrentMonth = new Date(currentYear, currentMonth, 1);
    const yesterday = new Date(today);
    yesterday.setDate(todayDate - 1);
    return `${fmt(startOfCurrentMonth)} ~ ${fmt(yesterday)}`;
  }
}
