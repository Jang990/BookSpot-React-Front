"use client";

import { useBookCart } from "@/contexts/BookCartContext";
import BookInfo from "@/components/Card/BookInfo";
import MapPopup from "@/components/Popup/MapPopup";
import { useState } from "react";
import { MapPin, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart } = useBookCart();
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
          <div className="flex flex-col items-center justify-center mt-12">
            <ShoppingCart size={64} className="text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">
              북카트가 비어있습니다.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cart.map((book) => (
                <BookInfo
                  key={book.id}
                  book={book}
                  onAddToCart={() => {}}
                  onRemoveFromCart={() => removeFromCart(book.id)}
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
