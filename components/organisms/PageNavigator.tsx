"use client";

import { NumberPageNavigator } from "@/components/molecules/pagination/NumberPageNavigator";
import { MAX_NUMBER_PAGE, SearchAfter } from "@/types/Pageable";
import { CursorPageNavigator } from "../molecules/pagination/CursorPageNavigator";
import { InfoPanel } from "../molecules/InfoPanel";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PAGE_QUERY_STRING_KEY } from "@/utils/querystring/PageNumber";
import { goToSearchAfterPage } from "@/utils/GoToPage";

interface PageNaviProps {
  totalPages: number | null;
  searchAfter: SearchAfter;
  hasNext?: boolean;
}

export const PageNavigator = ({ totalPages, searchAfter }: PageNaviProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const hasOnlyCursorCond = currentPage === null;
  searchParams.get("lastLoanCount") !== null &&
    searchParams.get("lastBookId") !== null;
  const isOutOfPageNumber: boolean = currentPage > MAX_NUMBER_PAGE;

  const hasNext =
    totalPages !== null && currentPage < totalPages && totalPages !== 0;

  const goToPage = (page: number): void => {
    const params = new URLSearchParams(searchParams as any);
    params.set(PAGE_QUERY_STRING_KEY, String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {hasOnlyCursorCond || isOutOfPageNumber || totalPages == null ? (
        <CursorPageNavigator
          clickMovePageBtn={() => goToPage(MAX_NUMBER_PAGE)}
          hasNext={true}
          clickPrev={() => {
            router.back();
          }}
          clickNext={() => {
            const hasSearchAfterCond =
              searchAfter.lastLoanCount != null &&
              searchAfter.lastBookId !== null;

            if (hasSearchAfterCond) {
              goToSearchAfterPage(router, pathname, searchParams, searchAfter);
              return;
            }
            throw new Error("SearchAfter 조건 잘못됨");
          }}
        />
      ) : (
        <div>
          <NumberPageNavigator
            currentPage={currentPage}
            totalPages={Math.min(totalPages, MAX_NUMBER_PAGE)}
            hasPrev={currentPage === 1}
            hasNext={hasNext}
            goToPage={goToPage}
            clickPrev={() => {
              goToPage(currentPage - 1);
            }}
            clickNext={() => {
              goToPage(currentPage);
            }}
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
