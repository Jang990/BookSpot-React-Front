"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  goToPage as goToPageHelper,
  goToSearchAfterPage,
} from "@/utils/GoToPage";
import { NaviOptionButton } from "@/components/atoms/button/navi/NaviOptionButton";
import { MAX_PAGINATED_PAGES } from "@/components/organisms/PageNavigator";
import { SearchAfter } from "@/types/Pageable";

interface CursorPageNaviProps {
  // 다음 페이지를 위한 현재 결과의 마지막 항목 정보
  searchAfter: SearchAfter;
  hasNextPage: boolean;
}

export const CursorPageNavigator = ({
  searchAfter,
  hasNextPage,
}: CursorPageNaviProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const lastLoanCount = searchAfter.lastLoanCount;
  const lastBookId = searchAfter.lastBookId;

  const goToPage = (pageNumber: number) => {
    goToPageHelper(router, pathname, searchParams, pageNumber);
  };

  const handlePrevious = () => {
    router.back();
  };

  const handleNext = () => {
    if (lastLoanCount != null && lastBookId !== null) {
      goToSearchAfterPage(router, pathname, searchParams, searchAfter);
      return;
    }
    throw new Error("SearchAfter 조건 잘못됨");
  };

  return (
    <div className="flex justify-center items-center mt-8 space-x-4">
      <div className="flex items-center space-x-2">
        <NaviOptionButton
          text="이전"
          onClick={handlePrevious}
          disabled={false}
        />

        <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-md border">
          <span className="text-sm text-gray-600">페이지</span>
          <span className="font-semibold text-gray-900">
            {MAX_PAGINATED_PAGES}+
          </span>
        </div>

        <NaviOptionButton
          text="다음"
          onClick={handleNext}
          disabled={!hasNextPage}
        />
      </div>

      {/* 50페이지로 돌아가기 버튼 */}
      <div className="border-l border-gray-300 pl-4">
        <button
          onClick={() => goToPage(MAX_PAGINATED_PAGES)}
          className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
        >
          페이지 {MAX_PAGINATED_PAGES}로 돌아가기
        </button>
      </div>
    </div>
  );
};
