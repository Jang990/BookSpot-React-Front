"use client";

import MapPopup from "@/components/organisms/MapPopup";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookCart } from "@/contexts/BookCartContext";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { BookPreview } from "@/types/BookPreview";
import { LibrarySearchButton } from "@/components/atoms/button/LibrarySearchButton";
import { Pageable } from "@/types/Pageable";
import { fetchBooksPreview } from "@/utils/api/BookPreviewApi";
import { convertBookPreview } from "@/utils/api/ApiResponseConvertor";

const MAX_CART_SIZE = 20;
const FIRST_PAGE = 0;
const CART_PAGEABLE: Pageable = {
  pageNumber: FIRST_PAGE,
  pageSize: MAX_CART_SIZE,
};
export default function Cart() {
  const { cart } = useBookCart();
  const [showMap, setShowMap] = useState(false);
  const [books, setBooks] = useState<BookPreview[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (isNotLoadedBooks()) {
      fetch(cart).then((loadedBooks) => setBooks(loadedBooks));
      return;
    }

    if (isClearAllEvent()) {
      setBooks([]);
      return;
    }

    if (isRemovedEvent()) {
      setBooks(filterBooks(cart));
      return;
    }

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
    setShowMap(true);
  };

  const handleLocationConfirm = useCallback(
    (location: { lat: number; lng: number }) => {
      router.push(
        `/libraries/stock/search?lat=${location.lat}&lng=${location.lng}&bookIds=${cart.join(",")}`
      );
    },
    [cart]
  );

  return (
    <>
      <div>
        <BookPreviewList
          searchResults={books}
          isLoading={false}
          isCartPage={true}
        />
        <div className="mt-8 flex justify-center">
          <LibrarySearchButton onClick={handleFindLibraries} />
          {showMap && (
            <MapPopup
              onConfirm={handleLocationConfirm}
              onClose={() => setShowMap(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}
