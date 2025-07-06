"use client";

import { TrashButton } from "@/components/atoms/button/icon/TrashButton";
import { BookPreview } from "@/types/BookPreview";
import { BookInfo } from "./BookInfo";

interface DeletableBookInfo {
  book: BookPreview;
  deleteBook: (id: string) => void;
}

export const DeletablaBookInfo = ({ book, deleteBook }: DeletableBookInfo) => {
  return (
    <BookInfo
      key={book.id}
      book={book}
      actionButtons={[<TrashButton onClick={() => deleteBook(book.id)} />]}
    />
  );
};
