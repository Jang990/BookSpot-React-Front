export const RankingPeriodMeta = {
  WEEKLY: { value: "WEEKLY", text: "주간" },
  MONTHLY: { value: "MONTHLY", text: "월간" },
} as const;

export const RankingGenderMeta = {
  ALL: { value: "ALL", text: "전체" },
  MALE: { value: "MALE", text: "남성" },
  FEMALE: { value: "FEMALE", text: "여성" },
} as const;

export const RankingAgeMeta = {
  ALL: { value: "ALL", text: "전체" },
  AGE_0_14: { value: "AGE_0_14", text: "어린이" },
  AGE_15_19: { value: "AGE_15_19", text: "청소년" },
  AGE_20_29: { value: "AGE_20_29", text: "20대" },
  AGE_30_39: { value: "AGE_30_39", text: "30대" },
  AGE_40_49: { value: "AGE_40_49", text: "40대" },
  AGE_50_UP: { value: "AGE_50_UP", text: "50대 이상" },
} as const;

export type RankingPeriod = keyof typeof RankingPeriodMeta;
export type RankingGender = keyof typeof RankingGenderMeta;
export type RankingAge = keyof typeof RankingAgeMeta;

export type RankingConditions = {
  period: RankingPeriod;
  gender: RankingGender;
  age: RankingAge;
};

function validateValue<T extends string>(
  raw: string,
  meta: Record<T, { value: string }>
): T | null {
  const key = raw.toUpperCase() as T;
  return key in meta ? key : null;
}

export function validateRankingConditions(raw: {
  period: string;
  gender: string;
  age: string;
}): RankingConditions | null {
  const period = validateValue(raw.period, RankingPeriodMeta);
  const gender = validateValue(raw.gender, RankingGenderMeta);
  const age = validateValue(raw.age, RankingAgeMeta);

  if (!period || !gender || !age) return null;
  return { period, gender, age };
}

export function textPeriod(period: RankingPeriod) {
  return RankingPeriodMeta[period].text;
}
export function textGender(gender: RankingGender) {
  return RankingGenderMeta[gender].text;
}
export function textAge(age: RankingAge) {
  return RankingAgeMeta[age].text;
}
