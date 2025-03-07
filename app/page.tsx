"use client";

import { useState, useCallback, useEffect } from "react";
import { debounce } from "@/utils/debounce";
import { BookPreview } from "@/types/BookPreview";
import { fetchBooksPreview } from "@/utils/api/BookPreviewApi";
import { convertBookPreview } from "@/utils/api/ApiResponseConvertor";
import { BookSearchBar } from "@/components/organisms/BookSearchBar";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { PageNavigator } from "@/components/molecules/PageNavigator";

const ITEMS_PER_PAGE = 12;
const MIN_SEARCH_TERM_LENGTH = 2;
const FIRST_PAGE = 1;

export default function Home() {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<BookPreview[]>([]);

  const loadBooks = useCallback(async (term: string, currentPage: number) => {
    try {
      setIsLoading(true);
      setSearchResults([]);
      const json = await fetchBooksPreview({
        keyword: term,
        pageable: { pageNumber: currentPage - 1, pageSize: ITEMS_PER_PAGE },
      });
      setTotalPage(json.totalPages);
      const newBooks = json.content.map(convertBookPreview);
      setSearchResults(newBooks);
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
    <>
      <BookSearchBar
        // searchTerm={searchTerm}
        isLoading={isLoading}
        doSearch={(term: string) => {
          setSearchTerm(term);
        }}
      />

      <BookPreviewList
        searchResults={searchResults}
        isLoading={isLoading}
        isCartPage={false}
      />

      <PageNavigator
        currentPage={page}
        totalPages={totalPage}
        onPageChange={setPage}
      />
    </>
  );
}
