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
const FIRST_PAGE = 0;

export default function BookSearch({ lastBookElementRef }: BookSearchProps) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<BookPreview[]>([]);

  const loadBooks = useCallback(
    async (term: string, currentPage: number) => {
      setIsLoading(true);
      try {
        const json = await fetchBooksPreview({
          keyword: term,
          pageNumber: currentPage,
          pageSize: ITEMS_PER_PAGE,
        });

        setHasMore(!json.last);
        const newBooks = json.content.map(convertBookPreview);
        console.log(newBooks);
        if (currentPage === FIRST_PAGE) {
          setSearchResults(newBooks);
        } else {
          setSearchResults((prev) => [...prev, ...newBooks]);
        }
      } catch (error) {
        // TODO: 예외 처리 필요
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setHasMore]
  );

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setPage(FIRST_PAGE);
      loadBooks(term, FIRST_PAGE);
    }, 300),
    [loadBooks]
  );

  useEffect(() => {
    if (searchTerm && searchTerm.length >= MIN_SEARCH_TERM_LENGTH) {
      debouncedSearch(searchTerm);
    } else {
      setPage(FIRST_PAGE);
      loadBooks("", FIRST_PAGE);
    }
  }, [searchTerm, debouncedSearch, setPage, loadBooks]);

  useEffect(() => {
    if (page > FIRST_PAGE) {
      loadBooks(searchTerm, page);
    }
  }, [page, searchTerm, loadBooks]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading, hasMore, setPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        handleLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleLoadMore]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <BookSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BookSimpleSearchResult
        searchResults={searchResults}
        isLoading={isLoading}
        lastBookElementRef={lastBookElementRef}
      />
    </div>
  );
}
