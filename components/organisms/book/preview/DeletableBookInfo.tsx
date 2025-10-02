"use client";

import { TrashButton } from "@/components/atoms/button/icon/TrashButton";
import { BookPreview } from "@/types/BookPreview";
import { BookInfo } from "./BookInfo";
import { IconTextButton } from "@/components/atoms/button/icon/CommonIconButton";
import { Trash2 } from "lucide-react";

interface DeletableBookInfo {
  book: BookPreview;
  deleteBook: (book: BookPreview) => void;
}

export const DeletablaBookInfo = ({ book, deleteBook }: DeletableBookInfo) => {
  return (
    <BookInfo
      key={book.id}
      book={book}
      actionButton={
        <IconTextButton
          icon={<Trash2 className="w-4 h-4" />}
          onClick={() => deleteBook(book)}
        >
          제거하기
        </IconTextButton>
      }
    />
  );
};
