import { validateRankingConditions } from "@/types/BookRankings";
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

  return <div>"Hello World!"</div>;
}
