import { SearchAfter } from "@/types/Pageable";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import {
  LAST_BOOK_ID_KEY,
  LAST_LOAN_COUNT_KEY,
} from "./querystring/SearchAfter";

export const goToPage = (
  router: AppRouterInstance,
  path: string,
  searchParams: ReadonlyURLSearchParams,
  page: number
) => {
  const params = new URLSearchParams(searchParams as any);
  params.set("page", String(page));
  router.push(`${path}?${params.toString()}`);
};

export const goToSearchAfterPage = (
  router: AppRouterInstance,
  path: string,
  searchParams: ReadonlyURLSearchParams,
  searchAfter: SearchAfter
) => {
  const params = new URLSearchParams(searchParams as any);
  params.set(LAST_LOAN_COUNT_KEY, String(searchAfter.lastLoanCount));
  params.set(LAST_BOOK_ID_KEY, String(searchAfter.lastBookId));
  router.push(`${path}?${params.toString()}`);
};
