"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookCart } from "@/contexts/BookCartContext";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { BookPreview } from "@/types/BookPreview";
import { Pageable } from "@/types/Pageable";
import { fetchBooksPreview } from "@/utils/api/BookPreviewApi";
import { convertBookPreview } from "@/utils/api/ApiResponseConvertor";
import { MapPin, ShoppingCart, Trash2 } from "lucide-react";
import { ConfirmPopup } from "@/components/molecules/ConfirmPopup";
import { SecondaryButton } from "@/components/atoms/button/SecondaryButton";
import { PrimaryButton } from "@/components/atoms/button/PrimaryButton";

const MAX_CART_SIZE = 20;
const FIRST_PAGE = 0;
const CART_PAGEABLE: Pageable = {
  pageNumber: FIRST_PAGE,
  pageSize: MAX_CART_SIZE,
};
export default function Cart() {
  const { cart, clearCart } = useBookCart();
  const [books, setBooks] = useState<BookPreview[]>([]);
  const router = useRouter();
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  useEffect(() => {
    if (isNotLoadedBooks())
      fetch(cart).then((loadedBooks) => setBooks(loadedBooks));
    else if (isClearAllEvent()) setBooks([]);
    else if (isRemovedEvent()) setBooks(filterBooks(cart));

    function isRemovedEvent() {
      return cart.length !== 0 && filterBooks(cart).length < books.length;
    }

    function isNotLoadedBooks() {
      return cart.length !== 0 && books.length === 0;
    }

    function isClearAllEvent() {
      return cart.length === 0 && books.length !== 0;
    }

    function filterBooks(ids: string[]): BookPreview[] {
      return books.filter((book) => ids.includes(book.id));
    }

    function fetch(bookIds: string[]): Promise<BookPreview[]> {
      return fetchBooksPreview({
        bookIds: bookIds,
        pageable: CART_PAGEABLE,
      }).then((json) => {
        return json.content.map(convertBookPreview);
      });
    }
  }, [cart]);

  const handleFindLibraries = () => {
    router.push(`/libraries/stock/search`);
  };

  const handleClearCartClick = () => {
    setShowConfirmPopup(true);
  };

  const handleConfirmClear = () => {
    clearCart();
    setBooks([]);
    setShowConfirmPopup(false);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-12">
            <ShoppingCart size={64} className="text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">
              북카트가 비어있습니다.
            </p>
          </div>
        ) : (
          <div>
            <BookPreviewList
              searchResults={books}
              isLoading={false}
              isCartPage={true}
            />

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={handleFindLibraries}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-colors flex items-center"
              >
                <MapPin className="mr-2" size={20} />
                도서관 찾기
              </button>

              <button
                onClick={handleClearCartClick}
                className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors flex items-center"
              >
                <Trash2 className="mr-2" size={20} />
                카트 비우기
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmPopup
        title="북카트 비우기"
        message="북카트의 모든 책을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmText="비우기"
        cancelText="취소"
        onConfirm={handleConfirmClear}
        onCancel={() => setShowConfirmPopup(false)}
        isOpen={showConfirmPopup}
        type="warning"
      />
    </div>
  );
}
