"use client";

import { CartButton } from "@/components/atoms/button/icon/CartButton";
import { BookPreview } from "@/types/BookPreview";
import { BookInfo } from "./BookInfo";

interface SearchableBookInfoProps {
  book: BookPreview;
  onClickAddBtn: (bookId: string) => void;
}

export const SearchableBookInfo = ({
  book,
  onClickAddBtn,
}: SearchableBookInfoProps) => {
  return (
    <BookInfo
      key={book.id}
      book={book}
      actionButtons={[<CartButton onClick={() => onClickAddBtn(book.id)} />]}
    />
  );
};
