"use client";

import { NumberPageNavigator } from "@/components/molecules/pagination/NumberPageNavigator";
import { useSearchParams } from "next/navigation";

interface PageNaviProps {
  totalPages: number;
}

export const MAX_PAGINATED_PAGES = 50;
export const PageNavigator = ({ totalPages }: PageNaviProps) => {
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  return (
    <>
      <NumberPageNavigator currentPage={currentPage} totalPages={totalPages} />
    </>
  );
};
