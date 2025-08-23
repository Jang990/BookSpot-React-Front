"use client";
import { MIN_SEARCH_TERM_LENGTH } from "@/types/Pageable";
import { PAGE_QUERY_STRING_KEY } from "@/utils/querystring/PageNumber";
import {
  LAST_BOOK_ID_KEY,
  LAST_LOAN_COUNT_KEY,
} from "@/utils/querystring/SearchAfter";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { XButton } from "../atoms/button/icon/XButton";
import { SEARCH_TERM_KEY } from "@/utils/querystring/SearchTerm";
import { useSearchTerm } from "@/contexts/SearchTermContext";

interface SearchProps {
  initialSearchTerm: string;
}

export const SearchBar = ({ initialSearchTerm }: SearchProps) => {
  const { searchTerm, setSearchTerm, clearSearchTerm } = useSearchTerm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const initTerm = searchParams.get(SEARCH_TERM_KEY);
    setSearchTerm(initTerm === null ? "" : initTerm);
  }, []);

  // 검색 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 2자 미만 검색 불가 알림 필요
    if (
      searchTerm &&
      searchTerm.length !== 0 &&
      searchTerm.length < MIN_SEARCH_TERM_LENGTH
    ) {
      alert(
        `검색어를 제거하거나 ${MIN_SEARCH_TERM_LENGTH}글자 이상 입력해주세요.`
      );
      return;
    }

    search(searchTerm);
  };

  function search(searchTerm: string) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams as any);
      params.set("searchTerm", searchTerm);
      params.delete(PAGE_QUERY_STRING_KEY);
      params.delete(LAST_LOAN_COUNT_KEY);
      params.delete(LAST_BOOK_ID_KEY);
      router.push(`?${params.toString()}`);
    });
  }

  const handleClear = () => {
    clearSearchTerm();
    search("");
  };

  // input 따로 뺄 것
  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        name="search"
        type="text"
        placeholder="책 제목, 저자 또는 출판사를 입력하세요"
        className={`w-full p-4 pr-12 text-lg border-4 rounded-full focus:outline-none transition-all duration-300 ${
          isPending
            ? "border-primary animate-border-loading"
            : "border-input focus:border-primary"
        }`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-3">
        {searchTerm && <XButton onClick={handleClear} />}

        <button type="submit">
          <Search className="text-muted-foreground" size={24} />
        </button>
      </div>
    </form>
  );
};
