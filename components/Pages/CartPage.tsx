"use client";

import BookInfo from "@/components/organisms/BookInfo";
import MapPopup from "@/components/Popup/MapPopup";
import { useState } from "react";
import { MapPin, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBookCart } from "@/contexts/BookCartContext";
import { EmptyBookCart } from "../molecules/EmptyBookCart";

export default function CartPage() {
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
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {cart.length === 0 ? (
          <EmptyBookCart />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cart.map((bookId) => (
                <BookInfo
                  key={bookId}
                  book={{
                    id: bookId,
                    isbn: "9791162241851",
                    title: "오브젝트",
                    category: "004.57",
                    author: "조영호",
                    year: "2019",
                    publisher: "아무개",
                    image: "/placeholder.svg",
                  }}
                  isInCart={true}
                />
              ))}
            </div>
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
    </div>
  );
}
