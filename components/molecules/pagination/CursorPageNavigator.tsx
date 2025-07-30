"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { goToPage as goToPageHelper } from "@/utils/GoToPage";
import { NaviOptionButton } from "@/components/atoms/button/navi/NaviOptionButton";
import { MAX_NUMBER_PAGE, SearchAfter } from "@/types/Pageable";
import { ArrowLeft } from "lucide-react";

interface CursorPageNaviProps {
  hasNext: boolean;
  clickMovePageBtn: () => void;
  clickPrev: () => void;
  clickNext: () => void;
}

export const CursorPageNavigator = ({
  hasNext,
  clickMovePageBtn,
  clickPrev,
  clickNext,
}: CursorPageNaviProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (pageNumber: number) => {
    goToPageHelper(router, pathname, searchParams, pageNumber);
  };

  return (
    <div className="flex justify-center items-center mt-8 space-x-4">
      {/* 50페이지로 돌아가기 버튼 */}
      <div className="flex gap-2">
        {/* 개선된 버전: 텍스트 스타일 (아이콘 배경 효과만) */}
        <button
          onClick={clickMovePageBtn}
          className="group flex items-center gap-1 rounded-lg p-3 transition-all duration-300 hover:bg-primary/10"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg">
            <ArrowLeft
              size={16}
              className="text-primary transition-transform duration-300 group-hover:-translate-x-0.5"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs text-primary">이동하기</span>
            <span className="text-sm font-medium text-primary">
              {MAX_NUMBER_PAGE}페이지
            </span>
          </div>
        </button>
      </div>

      <div className="flex items-center space-x-2 border-l border-gray-300 pl-4">
        <NaviOptionButton text="이전" onClick={clickPrev} disabled={false} />

        <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-md border">
          <span className="text-sm text-gray-600">페이지</span>
          <span className="font-semibold text-gray-900">
            {MAX_NUMBER_PAGE}+
          </span>
        </div>

        <NaviOptionButton text="다음" onClick={clickNext} disabled={!hasNext} />
      </div>
    </div>
  );
};
