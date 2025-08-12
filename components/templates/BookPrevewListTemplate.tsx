"use client";
import { BookPreview } from "@/types/BookPreview";
import { EmptySearchResult } from "../molecules/EmptySearchResult";
import { SearchableBookInfo } from "../organisms/book/preview/SearchableBookInfo";
import { useBookCart } from "@/contexts/BookCartContext";
import { useState } from "react";
import { InfoToast } from "../molecules/toast/InfoToast";

interface BookPreviewListProps {
  searchResults: BookPreview[];
}

export const BookPreviewList = ({ searchResults }: BookPreviewListProps) => {
  const { addToCart } = useBookCart();
  const [toast, setToast] = useState<{
    message: string;
    type: "INFO" | "WARN";
  } | null>(null);

  const showToast = (message: string, type: "INFO" | "WARN" = "INFO") => {
    setToast({ message, type });
  };

  const handleAddToCart = (bookId: string) => {
    try {
      addToCart(bookId);
      showToast("장바구니에 추가되었습니다.", "INFO");
    } catch (err) {
      if (err instanceof Error) {
        showToast(err.message, "WARN");
      } else {
        showToast("알 수 없는 오류가 발생했습니다.", "WARN");
      }
    }
  };

  return (
    <div>
      {searchResults.length === 0 && <EmptySearchResult />}

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {searchResults.length !== 0 && (
          <>
            {searchResults.map((book) => (
              <SearchableBookInfo
                key={book.id}
                book={book}
                onClickAddBtn={handleAddToCart}
              ></SearchableBookInfo>
            ))}
          </>
        )}
      </div>

      {toast && (
        <InfoToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
