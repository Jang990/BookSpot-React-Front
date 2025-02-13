"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { debounce } from "@/utils/debounce";
import { BookSearchBar } from "@/components/organisms/BookSearchBar";
import { BookPreview } from "@/types/BookPreview";
import { convertBookPreview } from "@/utils/api/ApiResponseConvertor";
import { fetchBooksPreview } from "@/utils/api/BookPreviewApi";
import { EmptySearchResult } from "../molecules/EmptySearchResult";
import { BookInfo } from "@/components/organisms/BookInfo";
import { Loader } from "lucide-react";
import { BookPreviewList } from "./BookPrevewListTemplate";

const ITEMS_PER_PAGE = 12;
const MIN_SEARCH_TERM_LENGTH = 2;
const FIRST_PAGE = 0;

export default function BookSearch() {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<BookPreview[]>([]);

  function addPage() {
    setPage((prevPage) => prevPage + 1);
  }

  const loadBooks = useCallback(async (term: string, currentPage: number) => {
    try {
      setIsLoading(true);
      const json = await fetchBooksPreview({
        keyword: term,
        pageable: { pageNumber: currentPage, pageSize: ITEMS_PER_PAGE },
      });

      setHasMore(!json.last);
      const newBooks = json.content.map(convertBookPreview);
      if (currentPage === FIRST_PAGE) setSearchResults(newBooks);
      else setSearchResults((prev) => [...prev, ...newBooks]);
    } catch (error) {
      // TODO: 예외 처리 필요
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setPage(FIRST_PAGE);
      loadBooks(term, FIRST_PAGE);
    }, 300),
    []
  );

  useEffect(() => {
    if (isInvalidTermLength()) {
      clearResult();
      return;
    }
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (page < FIRST_PAGE || isInvalidTermLength()) {
      clearResult();
      return;
    }
    loadBooks(searchTerm, page);
  }, [page]);

  function clearResult() {
    setPage(FIRST_PAGE);
    setSearchResults([]);
  }

  function isInvalidTermLength() {
    return !searchTerm || searchTerm.length < MIN_SEARCH_TERM_LENGTH;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <BookSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isLoading={isLoading}
      />

      <BookPreviewList
        addPage={addPage}
        searchResults={searchResults}
        isLoading={isLoading}
        hasMore={hasMore}
      />
    </div>
  );
}
