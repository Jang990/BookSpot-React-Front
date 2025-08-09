import { NaviOptionButton } from "@/components/atoms/button/navi/NaviOptionButton";
import { NaviPageNumberButton } from "@/components/atoms/button/navi/NaviPageNumberButton";

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
  // 모바일용 전체 페이지 번호 생성 (스크롤용)
  const getAllPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      {/* 이전 페이지 버튼 */}
      <NaviOptionButton text="이전" onClick={clickPrev} disabled={!hasPrev} />

      {/* 첫 페이지 버튼 (항상 표시) */}
      <NaviPageNumberButton
        page={1}
        onClick={() => goToPage(1)}
        clicked={currentPage === 1}
      />

      {/* 스크롤 가능한 페이지 번호 컨테이너 */}
      <div
        className="flex overflow-x-auto scrollbar-hide space-x-2 max-w-[120px] px-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {getAllPageNumbers()
          .filter((page) => page !== 1 && page !== totalPages) // 첫 페이지와 마지막 페이지 제외
          .map((page) => (
            <div key={page} className="flex-shrink-0">
              <NaviPageNumberButton
                page={page}
                onClick={() => goToPage(page)}
                clicked={currentPage === page}
              />
            </div>
          ))}
      </div>

      {/* 마지막 페이지 버튼 (totalPages > 1일 때만 표시) */}
      {totalPages > 1 && (
        <NaviPageNumberButton
          page={totalPages}
          onClick={() => goToPage(totalPages)}
          clicked={currentPage === totalPages}
        />
      )}

      {/* 다음 페이지 버튼 */}
      <NaviOptionButton text="다음" onClick={clickNext} disabled={!hasNext} />
    </div>
  );
};
