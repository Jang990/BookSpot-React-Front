"use client";
import { BASE_URL } from "@/app/books/rankings/[period]/[gender]/[age]/page";
import { DropDownButton } from "@/components/molecules/button/filter/DropDownButton";
import {
  RankingAge,
  RankingAgeMeta,
  RankingConditions,
  RankingGender,
  RankingGenderMeta,
  RankingPeriod,
  RankingPeriodMeta,
  textAge,
  textGender,
  textPeriod,
} from "@/types/BookRankings";
import { Activity, Calendar, User } from "lucide-react";

interface Props {
  rankingConditions: RankingConditions;
}

export const RankingSearchButtons = ({ rankingConditions }: Props) => {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <DropDownButton
        selected={true}
        text={textPeriod(rankingConditions.period)}
        Icon={Calendar}
        items={Object.values(RankingPeriodMeta).map((period) => ({
          type: "link",
          text: period.text,
          href: createPeriodUrl(period.value as RankingPeriod),
        }))}
      />

      <DropDownButton
        selected={true}
        text={
          rankingConditions.gender === RankingGenderMeta.ALL.value
            ? "성별"
            : textGender(rankingConditions.gender)
        }
        Icon={User}
        items={Object.values(RankingGenderMeta).map((gender) => ({
          type: "link",
          text: gender.text,
          href: createGenderUrl(gender.value as RankingGender),
        }))}
      />

      <DropDownButton
        selected={true}
        text={
          rankingConditions.age === RankingAgeMeta.ALL.value
            ? "나이"
            : textAge(rankingConditions.age)
        }
        Icon={Activity}
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

  function createPeriodUrl(period: RankingPeriod): string {
    return createUrl({
      period: period,
      gender: rankingConditions.gender,
      age: rankingConditions.age,
    });
  }

  function createGenderUrl(gender: RankingGender): string {
    return createUrl({
      period: rankingConditions.period,
      gender: gender,
      age: rankingConditions.age,
    });
  }

  function createUrl(cond: RankingConditions): string {
    return `${BASE_URL}/${RankingPeriodMeta[cond.period].value}/${RankingGenderMeta[cond.gender].value}/${RankingAgeMeta[cond.age].value}`;
  }
};
