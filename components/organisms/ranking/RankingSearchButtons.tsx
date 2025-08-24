"use client";
import { BASE_URL } from "@/app/books/rankings/[period]/[gender]/[age]/page";
import { DropDownButton } from "@/components/molecules/button/filter/DropDownButton";
import {
  RankingAge,
  RankingAgeMeta,
  RankingConditions,
  RankingGenderMeta,
  RankingPeriodMeta,
  textAge,
} from "@/types/BookRankings";
import { Users } from "lucide-react";

interface Props {
  rankingConditions: RankingConditions;
}

export const RankingSearchButtons = ({ rankingConditions }: Props) => {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <DropDownButton
        selected={true}
        text={
          rankingConditions.age === RankingAgeMeta.ALL.value
            ? "나이"
            : textAge(rankingConditions.age)
        }
        Icon={Users}
        items={Object.values(RankingAgeMeta).map((age) => ({
          type: "link",
          text: age.text,
          href: createAgeUrl(age.value as RankingAge),
        }))}
      />
    </div>
  );

  function createAgeUrl(age: RankingAge): string {
    return createUrl({
      period: rankingConditions.period,
      gender: rankingConditions.gender,
      age,
    });
  }

  function createUrl(cond: RankingConditions): string {
    return `${BASE_URL}/${RankingPeriodMeta[cond.period].value}/${RankingGenderMeta[cond.gender].value}/${RankingAgeMeta[cond.age].value}`;
  }
};
