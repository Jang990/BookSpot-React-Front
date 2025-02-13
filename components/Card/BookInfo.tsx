"use client";

import { useState } from "react";
import { AddToCartButton } from "../atoms/button/AddToCartButton";
import { RemoveFromCartButton } from "../atoms/button/RemoveFromCartButton";
import { BookPreview } from "@/types/BookPreview";
import { BookPreviewInfo } from "../molecules/BookPreviewInfo";
import { BookPreviewImage } from "../molecules/BookPreviewImage";

interface BookInfoProps {
  book: BookPreview;
  isInCart?: boolean;
}

export default function BookInfo({ book, isInCart = false }: BookInfoProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col bg-card rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BookPreviewImage id={book.id} title={book.title} image={book.image} />
      <BookPreviewInfo book={book} />
      <div
        className={`absolute bottom-2 right-2 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        {!isInCart && <AddToCartButton bookId={book.id} />}
        {isInCart && <RemoveFromCartButton bookId={book.id} />}
      </div>
    </div>
  );
}
