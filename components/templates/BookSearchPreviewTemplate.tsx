"use client";

import { useState, useCallback, useEffect } from "react";
import { debounce } from "@/utils/debounce";
import { BookSearchBar } from "../molecules/BookSearchBar";
import { BookSimpleSearchResult } from "../organisms/BookSearchPreview";
import { BookPreview } from "@/types/BookPreview";
import { convertBookPreview } from "@/utils/api/ApiResponseConvertor";
import { fetchBooksPreview } from "@/utils/api/BookPreviewApi";

interface BookSearchProps {
  lastBookElementRef: (node: HTMLDivElement | null) => void;
}

const ITEMS_PER_PAGE = 12;
const MIN_SEARCH_TERM_LENGTH = 2;

export default function BookSearch({ lastBookElementRef }: BookSearchProps) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<BookPreview[]>([]);

  const debouncedSearch = useCallback(
    debounce(async (term: string, page: number) => {
      try {
        const json = await fetchBooksPreview({
          keyword: term,
          pageNumber: page,
          pageSize: ITEMS_PER_PAGE,
        });
        setSearchResults(json.content.map(convertBookPreview));
        setHasMore(!json.last);
      } catch (error) {
        // TODO: 예외 처리 필요
        console.error(error);
      }
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
