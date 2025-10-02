"use client";

import { ReactNode, useState } from "react";
import { BookPreview } from "@/types/BookPreview";
import { BookPreviewInfo } from "@/components/molecules/BookPreviewInfo";
import { BookPreviewImage } from "@/components/molecules/BookPreviewImage";

interface BookInfoProps {
  book: BookPreview;
  actionButton: ReactNode;
}

export const BookInfo = ({ book, actionButton }: BookInfoProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col bg-card rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BookPreviewImage
        id={book.id}
        title={book.title}
        isbn13={book.isbn13}
        rank={book.rank}
        isHovered={isHovered}
        actionButton={actionButton}
      />
      <BookPreviewInfo book={book} />
    </div>
  );
};
