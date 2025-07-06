"use client";

import { CartButton } from "@/components/atoms/button/icon/CartButton";
import { useBookCart } from "@/contexts/BookCartContext";
import { BookPreview } from "@/types/BookPreview";
import { BookInfo } from "./BookInfo";
import { MoveButton } from "@/components/atoms/button/icon/MoveButton";

interface SearchableBookInfoProps {
  book: BookPreview;
}

export const SearchableBookInfo = ({ book }: SearchableBookInfoProps) => {
  const { addToCart } = useBookCart();

  return (
    <BookInfo
      key={book.id}
      book={book}
      actionButtons={[
        <MoveButton onClick={() => console.log("Hello World")} />,
        <CartButton onClick={() => addToCart(book.id)} />,
      ]}
    />
  );
};
