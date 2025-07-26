"use client";

import { NumberPageNavigator } from "@/components/molecules/pagination/NumberPageNavigator";
import { MAX_NUMBER_PAGE, SearchAfter } from "@/types/Pageable";
import { useSearchParams } from "next/navigation";
import { CursorPageNavigator } from "../molecules/pagination/CursorPageNavigator";
import { InfoPanel } from "../molecules/InfoPanel";

interface PageNaviProps {
  totalPages: number | null;
  searchAfter: SearchAfter;
  hasNext?: boolean;
}

export const PageNavigator = ({ totalPages, searchAfter }: PageNaviProps) => {
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const hasOnlyCursorCond = currentPage === null;
  searchParams.get("lastLoanCount") !== null &&
    searchParams.get("lastBookId") !== null;
  const isOutOfPageNumber: boolean = currentPage > MAX_NUMBER_PAGE;

  const hasNext =
    totalPages !== null && currentPage < totalPages && totalPages !== 0;

  return (
    <>
      {hasOnlyCursorCond || isOutOfPageNumber || totalPages == null ? (
        <CursorPageNavigator searchAfter={searchAfter} hasNextPage={true} />
      ) : (
        <div>
          <NumberPageNavigator
            currentPage={currentPage}
            totalPages={Math.min(totalPages, MAX_NUMBER_PAGE)}
            hasNext={hasNext}
          />
          {currentPage === MAX_NUMBER_PAGE && hasNext && (
            <div className="flex justify-center">
              <InfoPanel
                text={`검색 품질을 위해 ${MAX_NUMBER_PAGE} 페이지 이후부터는 번호 선택이 불가능합니다. '다음' 버튼을 이용해 주세요.`}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
