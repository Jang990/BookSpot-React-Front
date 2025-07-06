"use client";

import { CartButton } from "@/components/atoms/button/icon/CartButton";
import { useBookCart } from "@/contexts/BookCartContext";
import { BookPreview } from "@/types/BookPreview";
import { BookInfo } from "./BookInfo";

interface SearchableBookInfoProps {
  book: BookPreview;
}

export const SearchableBookInfo = ({ book }: SearchableBookInfoProps) => {
  const { addToCart } = useBookCart();

  return (
    <BookInfo
      key={book.id}
      book={book}
      actionButtons={[<CartButton onClick={() => addToCart(book.id)} />]}
    />
  );
};
