"use client";

import { useState, useCallback, useEffect } from "react";
import { debounce } from "@/utils/debounce";
import { BookSearchBar } from "../molecules/BookSearchBar";
import { BookSimpleSearchResult } from "../organisms/BookSearchPreview";
import { BookPreview } from "@/types/BookPreview";
import { convertBookPreview } from "@/utils/api/ApiResponseConvertor";

interface BookSearchProps {
  setHasMore: (hasMore: boolean) => void;
  lastBookElementRef: (node: HTMLDivElement | null) => void;
}

const ITEMS_PER_PAGE = 12;
const MIN_SEARCH_TERM_LENGTH = 2;
const BOOK_API_URL = "http://localhost:8080/api/books";

export default function BookSearch({
  setHasMore,
  lastBookElementRef,
}: BookSearchProps) {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<BookPreview[]>([]);

  const debouncedSearch = useCallback(
    debounce((term: string, page: number) => {
      fetch(
        `${BOOK_API_URL}?title=${term}&page=${page}&size=${ITEMS_PER_PAGE}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error("Network response was not ok");
        })
        .then((json) => {
          setSearchResults(json.content.map(convertBookPreview));
          setHasMore(!json.last);
        })
        .catch((error) => console.error("Error:", error));
    }, 500),
    []
  );

  useEffect(() => {
    if (searchTerm.length < MIN_SEARCH_TERM_LENGTH) return;

    debouncedSearch(searchTerm, page);
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
