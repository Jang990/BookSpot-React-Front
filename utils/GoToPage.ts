import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

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
