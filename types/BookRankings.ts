export const PERIODS = ["WEEKLY", "MONTHLY"] as const;
export type RankingPeriod = (typeof PERIODS)[number];

export const GENDERS = ["ALL", "MALE", "FEMALE"] as const;
export type RankingGender = (typeof GENDERS)[number];

export const AGES = [
  "ALL",
  "AGE_0_14",
  "AGE_15_19",
  "AGE_20_29",
  "AGE_30_39",
  "AGE_40_49",
  "AGE_50_UP",
] as const;
export type RankingAge = (typeof AGES)[number];

export type RankingConditions = {
  period: RankingPeriod;
  gender: RankingGender;
  age: RankingAge;
};

export function validateRankingConditions(raw: {
  period: string;
  gender: string;
  age: string;
}): RankingConditions | null {
  const period = PERIODS.includes(raw.period.toUpperCase() as RankingPeriod)
    ? (raw.period.toUpperCase() as RankingPeriod)
    : null;
  const gender = GENDERS.includes(raw.gender.toUpperCase() as RankingGender)
    ? (raw.gender.toUpperCase() as RankingGender)
    : null;
  const age = AGES.includes(raw.age.toUpperCase() as RankingAge)
    ? (raw.age.toUpperCase() as RankingAge)
    : null;

  if (!period || !gender || !age) return null;
  return { period, gender, age };
}
