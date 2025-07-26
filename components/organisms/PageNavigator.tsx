"use client";

import { NumberPageNavigator } from "@/components/molecules/pagination/NumberPageNavigator";
import { SearchAfter } from "@/types/Pageable";
import { useSearchParams } from "next/navigation";
import { CursorPageNavigator } from "../molecules/pagination/CursorPageNavigator";

interface PageNaviProps {
  totalPages: number | null;
  searchAfter: SearchAfter;
  hasNext?: boolean;
}

export const MAX_PAGINATED_PAGES = 50;
export const PageNavigator = ({
  totalPages,
  searchAfter,
  hasNext,
}: PageNaviProps) => {
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const hasOnlyCursorCond = currentPage === null;
  searchParams.get("lastLoanCount") !== null &&
    searchParams.get("lastBookId") !== null;
  const isOutOfPageNumber: boolean = currentPage > MAX_PAGINATED_PAGES;

  return (
    <>
      {hasOnlyCursorCond || isOutOfPageNumber || totalPages == null ? (
        <CursorPageNavigator searchAfter={searchAfter} hasNextPage={true} />
      ) : (
        <NumberPageNavigator
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
};
