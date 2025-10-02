"use client";

import { ReactNode } from "react";
import { BookPreview } from "@/types/BookPreview";
import { BookPreviewInfo } from "@/components/molecules/BookPreviewInfo";
import { BookPreviewImage } from "@/components/molecules/BookPreviewImage";

interface BookInfoProps {
  book: BookPreview;
  actionButton: ReactNode;
}

export const BookInfo = ({ book, actionButton }: BookInfoProps) => {
  return (
    <div className="flex flex-col bg-card rounded-lg shadow-md overflow-hidden transition-all duration-200">
      <BookPreviewImage
        id={book.id}
        title={book.title}
        isbn13={book.isbn13}
        rank={book.rank}
        actionButton={actionButton}
      />
      <BookPreviewInfo book={book} />
    </div>
  );
};
