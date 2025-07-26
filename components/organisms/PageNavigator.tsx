"use client";

import { NumberPageNavigator } from "@/components/molecules/pagination/NumberPageNavigator";
import { MAX_NUMBER_PAGE, SearchAfter } from "@/types/Pageable";
import { useSearchParams } from "next/navigation";
import { CursorPageNavigator } from "../molecules/pagination/CursorPageNavigator";

interface PageNaviProps {
  totalPages: number | null;
  searchAfter: SearchAfter;
  hasNext?: boolean;
}

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
  const isOutOfPageNumber: boolean = currentPage > MAX_NUMBER_PAGE;

  return (
    <>
      {hasOnlyCursorCond || isOutOfPageNumber || totalPages == null ? (
        <CursorPageNavigator searchAfter={searchAfter} hasNextPage={true} />
      ) : (
        <NumberPageNavigator
          currentPage={currentPage}
          totalPages={Math.min(totalPages, MAX_NUMBER_PAGE)}
          hasNext={
            currentPage === totalPages ||
            totalPages === 0 ||
            totalPages > MAX_NUMBER_PAGE
          }
        />
      )}
    </>
  );
};
