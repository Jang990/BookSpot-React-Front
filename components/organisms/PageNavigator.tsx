"use client";

import { NumberPageNavigator } from "@/components/molecules/pagination/NumberPageNavigator";
import { MAX_NUMBER_PAGE, SearchAfter } from "@/types/Pageable";
import { CursorPageNavigator } from "../molecules/pagination/CursorPageNavigator";
import { InfoPanel } from "../molecules/InfoPanel";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PAGE_QUERY_STRING_KEY } from "@/utils/querystring/PageNumber";
import {
  LAST_BOOK_ID_KEY,
  LAST_LOAN_COUNT_KEY,
  LAST_SCORE_KEY,
} from "@/utils/querystring/SearchAfter";
import { SEARCH_TERM_KEY } from "@/utils/querystring/SearchTerm";
import { useEffect, useState } from "react";
import { MobileNumberPageNavigator } from "../molecules/pagination/MobileNumberPageNavigator";

interface PageNaviProps {
  totalPages: number | null;
  searchAfter: SearchAfter;
  hasNext: boolean;
}

export const PageNavigator = ({
  totalPages,
  searchAfter,
  hasNext,
}: PageNaviProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isMobile, setIsMobile] = useState(false);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const hasOnlyCursorCond = currentPage === null;
  searchParams.get("lastLoanCount") !== null &&
    searchParams.get("lastBookId") !== null;
  const isOutOfPageNumber: boolean = currentPage > MAX_NUMBER_PAGE;

  const goToPage = (page: number): void => {
    const params = new URLSearchParams(searchParams as any);
    params.set(PAGE_QUERY_STRING_KEY, String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const goToSearchAfter = (): void => {
    const hasSearchAfterCond =
      searchAfter.lastLoanCount != null && searchAfter.lastBookId !== null;

    if (hasSearchAfterCond) {
      const params = new URLSearchParams(searchParams as any);
      if (params.get(SEARCH_TERM_KEY) && searchAfter.lastScore)
        params.set(LAST_SCORE_KEY, String(searchAfter.lastScore));

      params.set(PAGE_QUERY_STRING_KEY, String(MAX_NUMBER_PAGE + 1));
      params.set(LAST_LOAN_COUNT_KEY, String(searchAfter.lastLoanCount));
      params.set(LAST_BOOK_ID_KEY, String(searchAfter.lastBookId));
      router.push(`${pathname}?${params.toString()}`);
      return;
    }

    throw new Error("SearchAfter 조건 잘못됨");
  };

  return (
    <>
      {hasOnlyCursorCond || isOutOfPageNumber || totalPages == null ? (
        <CursorPageNavigator
          clickMovePageBtn={() => goToPage(MAX_NUMBER_PAGE)}
          hasNext={hasNext}
          clickPrev={() => {
            router.back();
          }}
          clickNext={goToSearchAfter}
        />
      ) : (
        <div>
          {isMobile ? (
            <MobileNumberPageNavigator
              currentPage={currentPage}
              totalPages={Math.min(totalPages, MAX_NUMBER_PAGE)}
              hasPrev={currentPage > 1}
              hasNext={hasNext}
              goToPage={goToPage}
              clickPrev={() => {
                goToPage(currentPage - 1);
              }}
              clickNext={() => {
                if (currentPage === MAX_NUMBER_PAGE && hasNext)
                  goToSearchAfter();
                else goToPage(currentPage + 1);
              }}
            />
          ) : (
            <NumberPageNavigator
              currentPage={currentPage}
              totalPages={Math.min(totalPages, MAX_NUMBER_PAGE)}
              hasPrev={currentPage > 1}
              hasNext={hasNext}
              goToPage={goToPage}
              clickPrev={() => {
                goToPage(currentPage - 1);
              }}
              clickNext={() => {
                if (currentPage === MAX_NUMBER_PAGE && hasNext)
                  goToSearchAfter();
                else goToPage(currentPage + 1);
              }}
            />
          )}
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
