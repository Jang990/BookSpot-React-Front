import { NaviOptionButton } from "@/components/atoms/button/navi/NaviOptionButton";
import { NaviPageNumberButton } from "@/components/atoms/button/navi/NaviPageNumberButton";
import { useEffect, useRef } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  goToPage: (page: number) => void;
  clickPrev: () => void;
  clickNext: () => void;
}

export const MobileNumberPageNavigator = ({
  currentPage,
  totalPages,
  hasPrev,
  hasNext,
  goToPage,
  clickPrev,
  clickNext,
}: PaginationProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 현재 페이지 버튼이 보이도록 스크롤 위치 조정 (마운트 + currentPage 변경 시)
  useEffect(() => {
    if (!scrollRef.current) return;

    if (currentPage === 1) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (currentPage === totalPages) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: "smooth",
      });
      return;
    }

    // 중앙 정렬 로직 (기존 코드)
    const buttons =
      scrollRef.current.querySelectorAll<HTMLDivElement>("div.flex-shrink-0");
    const index = currentPage - 2;

    if (index >= 0 && index < buttons.length) {
      const button = buttons[index];
      const container = scrollRef.current;

      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const buttonCenter = buttonRect.left + buttonRect.width / 2;
      const containerLeft = containerRect.left;

      const scrollTo =
        container.scrollLeft +
        (buttonCenter - containerLeft) -
        container.clientWidth / 2;

      container.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  }, [currentPage, totalPages]);

  // 2부터 totalPages-1까지 전체 페이지 배열
  const centerPages = [];
  for (let i = 2; i < totalPages; i++) {
    centerPages.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      {/* 이전 */}
      <NaviOptionButton text="이전" onClick={clickPrev} disabled={!hasPrev} />

      {/* 첫 페이지 */}
      <NaviPageNumberButton
        page={1}
        onClick={() => goToPage(1)}
        clicked={currentPage === 1}
      />

      {/* 중앙 스크롤 영역 */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide space-x-2 max-w-[120px] px-1"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {centerPages.map((page) => (
          <div key={page} className="flex-shrink-0">
            <NaviPageNumberButton
              page={page}
              onClick={() => goToPage(page)}
              clicked={currentPage === page}
            />
          </div>
        ))}
      </div>

      {/* 마지막 페이지 */}
      {totalPages > 1 && (
        <NaviPageNumberButton
          page={totalPages}
          onClick={() => goToPage(totalPages)}
          clicked={currentPage === totalPages}
        />
      )}

      {/* 다음 */}
      <NaviOptionButton text="다음" onClick={clickNext} disabled={!hasNext} />
    </div>
  );
};
