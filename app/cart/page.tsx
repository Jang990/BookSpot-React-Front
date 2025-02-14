"use client";

import { BookInfo } from "@/components/organisms/BookInfo";
import MapPopup from "@/components/Popup/MapPopup";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBookCart } from "@/contexts/BookCartContext";
import { EmptyBookCart } from "@/components/molecules/EmptyBookCart";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { BookPreview } from "@/types/BookPreview";

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
        {cart.length === 0 && <EmptyBookCart />}
        {cart.length !== 0 && (
          <>
            <BookPreviewList
              searchResults={cart.map((bookId) => createTempPreview(bookId))}
              isLoading={false}
              hasMore={false}
            />
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleFindLibraries}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-colors flex items-center"
              >
                <MapPin className="mr-2" size={20} />
                소장 도서관 찾기 ({cart.length})
              </button>
            </div>
          </>
        )}
      </div>

      {showMap && (
        <MapPopup
          onConfirm={handleLocationConfirm}
          onClose={() => setShowMap(false)}
        />
      )}
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
