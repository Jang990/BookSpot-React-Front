"use client";

import { NaviOptionButton } from "@/components/atoms/button/navi/NaviOptionButton";
import { NaviPageNumberButton } from "@/components/atoms/button/navi/NaviPageNumberButton";
import { useRouter } from "next/navigation";

interface PaginationProps {
  searchTerm?: string;
  currentPage: number;
  totalPages: number;
}

export const PageNavigator = ({
  searchTerm,
  currentPage,
  totalPages,
}: PaginationProps) => {
  const router = useRouter();

  const goToPage = (page: number) => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("searchTerm", searchTerm);
    params.set("page", String(page));

    router.push(`/?${params.toString()}`);
  };

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
      <NaviOptionButton
        text="이전"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {/* 첫 페이지 버튼 (현재 페이지가 4 이상일 때만 표시) */}
      {getPageNumbers()[0] > 1 && (
        <>
          <NaviPageNumberButton
            page={1}
            onClick={() => goToPage(1)}
            clicked={currentPage === 1}
          />
          {getPageNumbers()[0] > 2 && <span className="px-1">...</span>}
        </>
      )}

      {/* 페이지 번호 버튼 */}
      {getPageNumbers().map((page) => (
        <NaviPageNumberButton
          key={page}
          page={page}
          onClick={() => goToPage(page)}
          clicked={currentPage === page}
        />
      ))}

      {/* 마지막 페이지 버튼 (마지막에서 3페이지 이상 떨어져 있을 때만 표시) */}
      {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
        <>
          <span className="px-1">...</span>
          <NaviPageNumberButton
            page={totalPages}
            onClick={() => goToPage(totalPages)}
            clicked={false}
          />
        </>
      )}

      {/* 다음 페이지 버튼 */}
      <NaviOptionButton
        text="다음"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      />
    </div>
  );
};
