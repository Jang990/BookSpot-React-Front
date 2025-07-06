"use client";

import { TrashButton } from "@/components/atoms/button/icon/TrashButton";
import { BookPreview } from "@/types/BookPreview";
import { BookInfo } from "./BookInfo";
import { MoveButton } from "@/components/atoms/button/icon/MoveButton";

interface DeletableBookInfo {
  book: BookPreview;
  deleteBook: (id: string) => void;
}

export const DeletablaBookInfo = ({ book, deleteBook }: DeletableBookInfo) => {
  return (
    <BookInfo
      key={book.id}
      book={book}
      actionButtons={[
        <MoveButton onClick={() => console.log("Hello World")} />,
        <TrashButton onClick={() => deleteBook(book.id)} />,
      ]}
    />
  );
};
