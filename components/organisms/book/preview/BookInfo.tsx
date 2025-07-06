"use client";

import { ReactNode, useState } from "react";
import { BookPreview } from "@/types/BookPreview";
import { BookPreviewInfo } from "@/components/molecules/BookPreviewInfo";
import { BookPreviewImage } from "@/components/molecules/BookPreviewImage";

interface BookInfoProps {
  book: BookPreview;
  actionButtons: ReactNode[];
}

export const BookInfo = ({ book, actionButtons }: BookInfoProps) => {
  const [isHovered, setIsHovered] = useState(false);

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
        {actionButtons.map((btn, i) => (
          <span key={i} className="ml-2">
            {btn}
          </span>
        ))}
      </div>
    </div>
  );
};
