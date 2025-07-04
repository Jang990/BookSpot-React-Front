"use client";

import { useState } from "react";
import { CartButton } from "@/components/atoms/button/icon/CartButton";
import { TrashButton } from "@/components/atoms/button/icon/TrashButton";
import { BookPreview } from "@/types/BookPreview";
import { BookPreviewInfo } from "../molecules/BookPreviewInfo";
import { BookPreviewImage } from "../molecules/BookPreviewImage";
import { useBookCart } from "@/contexts/BookCartContext";

interface BookInfoProps {
  book: BookPreview;
  isCartPage?: boolean;
  remove?: (id: string) => void;
}

export const BookInfo = ({ book, isCartPage, remove }: BookInfoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { removeFromCart, addToCart } = useBookCart();

  return (
    <div
      className="flex flex-col bg-card rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BookPreviewImage id={book.id} title={book.title} isbn13={book.isbn13} />
      <BookPreviewInfo book={book} />

      <div
        className={`absolute bottom-2 right-2 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        {isCartPage ? (
          <TrashButton
            onClick={() => {
              removeFromCart(book.id);
              remove?.(book.id);
            }}
          />
        ) : (
          <CartButton onClick={() => addToCart(book.id)} />
        )}
      </div>
    </div>
  );
};
