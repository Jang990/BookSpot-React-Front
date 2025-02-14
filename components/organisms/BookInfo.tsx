"use client";

import { forwardRef, useState } from "react";
import { CartButton } from "@/components/atoms/button/icon/CartButton";
import { TrashButton } from "@/components/atoms/button/icon/TrashButton";
import { BookPreview } from "@/types/BookPreview";
import { BookPreviewInfo } from "../molecules/BookPreviewInfo";
import { BookPreviewImage } from "../molecules/BookPreviewImage";
import { useBookCart } from "@/contexts/BookCartContext";

interface BookInfoProps {
  book: BookPreview;
  isInCart?: boolean;
}

export const BookInfo = forwardRef<HTMLDivElement, BookInfoProps>(
  ({ book, isInCart = false }: BookInfoProps, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const { removeFromCart, addToCart } = useBookCart();

    return (
      <div
        ref={ref}
        className="flex flex-col bg-card rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <BookPreviewImage id={book.id} title={book.title} image={book.image} />
        <BookPreviewInfo book={book} />
        <div
          className={`absolute bottom-2 right-2 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          {!isInCart && <CartButton onClick={() => addToCart(book.id)} />}
          {isInCart && <TrashButton onClick={() => removeFromCart(book.id)} />}
        </div>
      </div>
    );
  }
);
