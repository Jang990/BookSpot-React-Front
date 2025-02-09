"use client";

import { useState, useCallback, useEffect } from "react";
import type { Book } from "@/types/Book";
import BookInfo from "./Card/BookInfo";
import { books } from "@/data/books";
import { debounce } from "@/utils/debounce";
import { Search } from "lucide-react";
import { useBookCart } from "@/contexts/BookCartContext";

interface BookSearchProps {
  page: number;
  setHasMore: (hasMore: boolean) => void;
  lastBookElementRef: (node: HTMLDivElement | null) => void;
}

const ITEMS_PER_PAGE = 12;

export default function BookSearch({
  page,
  setHasMore,
  lastBookElementRef,
}: BookSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const { addToCart } = useBookCart();

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      const results = books.filter(
        (book) =>
          book.title.toLowerCase().includes(term.toLowerCase()) ||
          book.author.toLowerCase().includes(term.toLowerCase()) ||
          book.year.includes(term) ||
          book.category.includes(term) ||
          book.publisher.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results.slice(0, page * ITEMS_PER_PAGE));
      setHasMore(results.length > page * ITEMS_PER_PAGE);
    }, 500),
    []
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      setSearchResults(books.slice(0, page * ITEMS_PER_PAGE));
      setHasMore(books.length > page * ITEMS_PER_PAGE);
    }
  }, [searchTerm, debouncedSearch, page, setHasMore]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="책 제목, 저자, 출판년도, 카테고리 또는 출판사를 입력하세요"
          className="w-full p-4 pr-12 text-lg border-2 border-input rounded-full focus:outline-none focus:border-primary"
        />
        <Search
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          size={24}
        />
      </div>
      {searchResults.length === 0 && searchTerm ? (
        <div className="flex flex-col items-center justify-center mt-12">
          <Search size={64} className="text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((book, index) => (
            <div
              key={book.id}
              ref={
                index === searchResults.length - 1 ? lastBookElementRef : null
              }
            >
              <BookInfo
                book={book}
                onAddToCart={() => addToCart(book)}
                isInCart={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
