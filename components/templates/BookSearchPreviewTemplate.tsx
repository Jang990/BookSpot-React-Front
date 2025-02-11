"use client";

import { useState, useCallback, useEffect } from "react";
import type { Book } from "@/types/Book";
import { books } from "@/data/books";
import { debounce } from "@/utils/debounce";
import { BookSearchBar } from "../atoms/bar/BookSearchBar";
import { BookSimpleSearchResult } from "../organisms/BookSearchPreview";

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
      <BookSimpleSearchResult
        searchResults={searchResults}
        lastBookElementRef={lastBookElementRef}
      />
    </div>
  );
}
