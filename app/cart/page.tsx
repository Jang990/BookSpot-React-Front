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
import { GpsButton } from "@/components/atoms/button/GpsButton";

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
        />
        <div className="mt-8 flex justify-center">
          <GpsButton onClick={handleFindLibraries} label="소장 도서관 찾기" />
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
