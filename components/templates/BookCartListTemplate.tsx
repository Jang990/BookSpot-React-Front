"use client";

import { BookPreview } from "@/types/BookPreview";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { DeletablaBookInfo } from "@/components/organisms/book/preview/DeletableBookInfo";
import { useBookCart } from "@/contexts/BookCartContext";
import { BookCartPopup } from "../organisms/BookCartPopup";
import { InfoPanel } from "../molecules/InfoPanel";
import { PageTitle } from "../molecules/PageTitle";
import { Pageable } from "@/types/Pageable";
import { findBooksPreview } from "@/utils/api/BookPreviewApi";
import { SkeletonBookCard } from "../organisms/book/preview/SkeletonBookCard";

interface Props {
  bookIds: string[];
}

const MAX_CART_SIZE = 20;
const FIRST_PAGE = 0;
const CART_PAGEABLE: Pageable = {
  pageNumber: FIRST_PAGE,
  pageSize: MAX_CART_SIZE,
};

export const BookCartListTemplate = ({ bookIds }: Props) => {
  const { removeFromCart } = useBookCart();
  const [books, setBooks] = useState<BookPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookIds.length === 0) {
      setBooks([]);
      setLoading(false);
    } else {
      setLoading(true);
      findBooksPreview(
        {
          keyword: null,
          bookIds: bookIds,
          categoryCond: null,
        },
        CART_PAGEABLE
      )
        .then((json) => setBooks(json.books))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle text="북카트" />
        {loading ? (
          <div className="pe-3">
            <div className="h-5 w-28 bg-gray-300 rounded animate-pulse"></div>
          </div>
        ) : (
          <div className="text-muted-foreground pe-3">{`담은 책 : ${books.length} / ${MAX_CART_SIZE}`}</div>
        )}
      </div>
      <div>
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {/* 스켈레톤 컴포넌트를 원하는 개수만큼 반복 출력 */}
            {[...Array(6)].map((_, i) => (
              <SkeletonBookCard key={i} />
            ))}
          </div>
        )}
        {!loading && books.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-12">
            <ShoppingCart size={64} className="text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">
              북카트가 비어있습니다.
            </p>
          </div>
        )}
        {!loading && books.length !== 0 && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {books.length !== 0 && (
              <>
                {books.map((book) => (
                  <DeletablaBookInfo
                    key={book.id}
                    book={book}
                    deleteBook={(bookId: string) => {
                      removeFromCart(bookId);
                      setBooks(books.filter((b) => b.id !== bookId));
                    }}
                  ></DeletablaBookInfo>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      <div className="pt-3">
        <BookCartPopup></BookCartPopup>
      </div>
      <div className="pt-3">
        <InfoPanel text="원하는 책을 찾아 북카트에 담고, ‘도서관 찾기’ 버튼을 눌러 소장 여부를 확인해 보세요." />
      </div>
    </div>
  );
};
