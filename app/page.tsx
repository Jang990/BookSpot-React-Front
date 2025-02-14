"use client";

import { useState, useCallback, useEffect } from "react";
import { debounce } from "@/utils/debounce";
import { BookPreview } from "@/types/BookPreview";
import { fetchBooksPreview } from "@/utils/api/BookPreviewApi";
import { convertBookPreview } from "@/utils/api/ApiResponseConvertor";
import { BookSearchBar } from "@/components/organisms/BookSearchBar";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";

const ITEMS_PER_PAGE = 12;
const MIN_SEARCH_TERM_LENGTH = 2;
const FIRST_PAGE = 0;

export default function Home() {
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
    <main className="min-h-screen bg-gray-100">
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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
        </div>
      </div>
    </main>
  );
}
