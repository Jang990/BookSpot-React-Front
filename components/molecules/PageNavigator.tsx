"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PageNavigator = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // 표시할 페이지 번호 범위 계산
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // 한 번에 표시할 최대 페이지 수

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-primary hover:bg-primary/10"
        }`}
      >
        이전
      </button>

      {/* 첫 페이지 버튼 (현재 페이지가 4 이상일 때만 표시) */}
      {getPageNumbers()[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 rounded-md hover:bg-primary/10"
          >
            1
          </button>
          {getPageNumbers()[0] > 2 && <span className="px-1">...</span>}
        </>
      )}

      {/* 페이지 번호 버튼 */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? "bg-primary text-primary-foreground"
              : "hover:bg-primary/10"
          }`}
        >
          {page}
        </button>
      ))}

      {/* 마지막 페이지 버튼 (마지막에서 3페이지 이상 떨어져 있을 때만 표시) */}
      {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
        <>
          <span className="px-1">...</span>
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 rounded-md hover:bg-primary/10"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-primary hover:bg-primary/10"
        }`}
      >
        다음
      </button>
    </div>
  );
};
