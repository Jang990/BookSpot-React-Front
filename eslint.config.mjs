// eslint.config.js
import { defineConfig } from "eslint/config";
import { flatConfig as nextPlugin } from "@next/eslint-plugin-next";
import { flatConfig as prettierPlugin } from "eslint-plugin-prettier";
import tsPlugin from "@typescript-eslint/eslint-plugin";

// Next.js 핵심 규칙과 TS, Prettier 플러그인 적용
export default defineConfig([
  // Next.js Core Web Vitals 규칙
  nextPlugin.coreWebVitals,
  // TypeScript 지원
  {
    plugins: { "@typescript-eslint": tsPlugin },
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
  // Prettier 플러그인
  prettierPlugin,
  {
    rules: {
      "prettier/prettier": "error",
    },
  },
]);
