"use client";

import { BookPreview } from "@/types/BookPreview";
import { BookInfo } from "@/components/organisms/BookInfo";
import { Pageable } from "@/types/Pageable";
import { useBookCart } from "@/contexts/BookCartContext";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

interface Props {
  books: BookPreview[];
}

const MAX_CART_SIZE = 20;
const FIRST_PAGE = 0;
const CART_PAGEABLE: Pageable = {
  pageNumber: FIRST_PAGE,
  pageSize: MAX_CART_SIZE,
};

export const BookCartList = (props: Props) => {
  const { cart, clearCart } = useBookCart();
  const [books, setBooks] = useState<BookPreview[]>([]);
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
        isCartPage={true}
        remove={(bookId) => {
          setBooks(books.filter((book) => book.id !== bookId));
        }}
      />
    );
  }
};
