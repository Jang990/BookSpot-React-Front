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

const ITEMS_PER_PAGE = 12;
const MIN_SEARCH_TERM_LENGTH = 2;
const FIRST_PAGE = 0;

export default function BookSearch() {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<BookPreview[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (isLoading) return; // 로딩 중이면 observer 만들지 않음

    // 이전 observer가 있으면 해제
    if (observer.current) observer.current.disconnect();

    // 새로운 IntersectionObserver 생성
    observer.current = new IntersectionObserver((entries) => {
      // 마지막 요소가 화면에 보이면
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1); // 페이지 증가시켜서 다음 데이터 로드
      }
    });

    // 마지막 책 요소가 있으면 observer가 그 요소를 감시하도록 설정
    if (lastBookElementRef.current)
      observer.current.observe(lastBookElementRef.current);

    // 컴포넌트 언마운트 시 observer 해제
    return () => {
      if (observer.current) observer.current.disconnect(); // observer 연결 해제
    };
  }, [isLoading, hasMore]);

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

      {!isLoading && searchResults.length === 0 && <EmptySearchResult />}

      {searchResults.length !== 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((book, index) => createBookInfo(book, index))}
          </div>
        </>
      )}

      {isLoading && (
        <div className="flex justify-center items-center mt-8">
          <Loader className="animate-spin text-primary" size={32} />
        </div>
      )}
    </div>
  );

  function createBookInfo(book: BookPreview, index: number) {
    return (
      <BookInfo
        key={book.id}
        book={book}
        isInCart={false}
        ref={index === searchResults.length - 1 ? lastBookElementRef : null}
      />
    );
  }
}
