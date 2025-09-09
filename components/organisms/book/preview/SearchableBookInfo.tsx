"use client";

import { BagButton } from "@/components/atoms/button/icon/BagButton";
import { BookPreview } from "@/types/BookPreview";
import { BookInfo } from "./BookInfo";

interface SearchableBookInfoProps {
  book: BookPreview;
  onClickAddBtn: (book: BookPreview) => void;
}

export const SearchableBookInfo = ({
  book,
  onClickAddBtn,
}: SearchableBookInfoProps) => {
  return (
    <BookInfo
      key={book.id}
      book={book}
      actionButtons={[<BagButton onClick={() => onClickAddBtn(book)} />]}
    />
  );
};
