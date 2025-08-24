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

export function textAge(age: RankingAge): string {
  switch (age) {
    case RankingAge.ALL:
      return "ALL";
    case RankingAge.AGE_0_14:
      return "어린이";
    case RankingAge.AGE_15_19:
      return "청소년";
    case RankingAge.AGE_20_29:
      return "20대";
    case RankingAge.AGE_30_39:
      return "30대";
    case RankingAge.AGE_40_49:
      return "40대";
    case RankingAge.AGE_50_UP:
      return "50대 이상";
  }
}

export function textGender(gender: RankingGender): string {
  switch (gender) {
    case RankingGender.ALL:
      return "전체";
    case RankingGender.MALE:
      return "남성";
    case RankingGender.FEMALE:
      return "여성";
  }
}

export function textPeriod(gender: RankingPeriod): string {
  switch (gender) {
    case RankingPeriod.MONTHLY:
      return "월간";
    case RankingPeriod.WEEKLY:
      return "주간";
  }
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
