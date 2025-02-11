"use client";

import { useState, useCallback, useEffect } from "react";
import type { Book } from "@/types/Book";
import BookInfo from "./Card/BookInfo";
import { books } from "@/data/books";
import { debounce } from "@/utils/debounce";
import { Search } from "lucide-react";
import { BookSearchBar } from "./atoms/bar/BookSearchBar";

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
      <BookSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
              <BookInfo book={book} isInCart={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
