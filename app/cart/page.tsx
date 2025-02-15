"use client";

import MapPopup from "@/components/organisms/MapPopup";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookCart } from "@/contexts/BookCartContext";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { BookPreview } from "@/types/BookPreview";
import { LibrarySearchButton } from "@/components/atoms/button/LibrarySearchButton";
import { Pageable } from "@/types/Pageable";
import { fetchBooksPreviewByIds } from "@/utils/api/BookPreviewApi";
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
    fetchBooksPreviewByIds({
      bookIds: cart,
      pageable: CART_PAGEABLE,
    })
      .then((json) => json.content.map(convertBookPreview))
      .then((loadedBooks) => setBooks(loadedBooks));
  }, []);

  const handleFindLibraries = () => {
    setShowMap(true);
  };

  const handleLocationConfirm = (location: { lat: number; lng: number }) => {
    router.push(`/libraries?lat=${location.lat}&lng=${location.lng}`);
  };

  return (
    <>
      <div>
        <BookPreviewList
          searchResults={books}
          isLoading={false}
          hasMore={false}
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
