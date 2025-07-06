"use client";

import { MapPin, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmPopup } from "../molecules/ConfirmPopup";
import { useBookCart } from "@/contexts/BookCartContext";

export const BookCartPopup = () => {
  const { cart, clearCart } = useBookCart();
  const router = useRouter();
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handleFindLibraries = () => {
    const params = new URLSearchParams();
    cart.forEach((bookId) => params.append("bookIds", bookId));
    router.push(`/libraries/stock/search?${params.toString()}`);
  };

  const handleClearCartClick = () => {
    setShowConfirmPopup(true);
  };

  const handleConfirmClear = () => {
    clearCart();
    setShowConfirmPopup(false);
    window.location.reload();
  };

  return (
    <div>
      <div className="mt-4 flex justify-center gap-4">
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
};
