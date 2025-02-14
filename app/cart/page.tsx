"use client";

import MapPopup from "@/components/organisms/MapPopup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBookCart } from "@/contexts/BookCartContext";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { BookPreview } from "@/types/BookPreview";
import { LibrarySearchButton } from "@/components/atoms/button/LibrarySearchButton";

export default function Cart() {
  const { cart } = useBookCart();
  const [showMap, setShowMap] = useState(false);
  const router = useRouter();

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
          searchResults={cart.map((bookId) => createTempPreview(bookId))}
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

function createTempPreview(bookId: string): BookPreview {
  return {
    id: bookId,
    title: "오브젝트",
    author: "조영호",
    publicationYear: "2019",
    publisher: "아무개",
    image: "/placeholder.svg",
  };
}
