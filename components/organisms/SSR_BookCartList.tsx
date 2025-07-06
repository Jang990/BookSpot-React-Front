"use client";

import { BookPreview } from "@/types/BookPreview";
import { BookInfo } from "@/components/organisms/BookInfo";
import { useBookCart } from "@/contexts/BookCartContext";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { TrashButton } from "../atoms/button/icon/TrashButton";

interface Props {
  books: BookPreview[];
}

export const BookCartList = (props: Props) => {
  const [books, setBooks] = useState<BookPreview[]>([]);
  const { removeFromCart } = useBookCart();
  useEffect(() => setBooks(props.books), []);

  return (
    <div>
      {books.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-12">
          <ShoppingCart size={64} className="text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">
            북카트가 비어있습니다.
          </p>
        </div>
      )}
      {books.length !== 0 && (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {books.length !== 0 && (
            <>{books.map((book) => createBookInfo(book))}</>
          )}
        </div>
      )}
    </div>
  );

  function createBookInfo(book: BookPreview) {
    return (
      <BookInfo
        key={book.id}
        book={book}
        actionButtons={[
          <TrashButton
            onClick={() => {
              removeFromCart(book.id);
              setBooks(books.filter((b) => b.id !== book.id));
            }}
          />,
        ]}
      />
    );
  }
};
