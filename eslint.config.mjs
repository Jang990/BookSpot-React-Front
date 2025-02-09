import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// 기존 Next.js 설정
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Prettier와 ESLint 규칙 추가
  "plugin:prettier/recommended",
];

// 추가된 Prettier 규칙
eslintConfig.push({
  rules: {
    "prettier/prettier": "error", // Prettier와 ESLint가 충돌할 때, Prettier를 우선시하고 오류로 처리
  },
});

export default eslintConfig;
