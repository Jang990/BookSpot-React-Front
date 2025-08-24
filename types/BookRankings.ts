export enum RankingPeriod {
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

export enum RankingGender {
  ALL = "ALL",
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum RankingAge {
  ALL = "ALL",
  AGE_0_14 = "AGE_0_14",
  AGE_15_19 = "AGE_15_19",
  AGE_20_29 = "AGE_20_29",
  AGE_30_39 = "AGE_30_39",
  AGE_40_49 = "AGE_40_49",
  AGE_50_UP = "AGE_50_UP",
}

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
  // enum 값 배열로 만들기
  const periods = Object.values(RankingPeriod);
  const genders = Object.values(RankingGender);
  const ages = Object.values(RankingAge);

  const period = periods.includes(raw.period.toUpperCase() as RankingPeriod)
    ? (raw.period.toUpperCase() as RankingPeriod)
    : null;

  const gender = genders.includes(raw.gender.toUpperCase() as RankingGender)
    ? (raw.gender.toUpperCase() as RankingGender)
    : null;

  const age = ages.includes(raw.age.toUpperCase() as RankingAge)
    ? (raw.age.toUpperCase() as RankingAge)
    : null;

  if (!period || !gender || !age) return null;
  return { period, gender, age };
}
