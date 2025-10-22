"use client";
import { MIN_SEARCH_TERM_LENGTH } from "@/types/Pageable";
import { PAGE_QUERY_STRING_KEY } from "@/utils/querystring/PageNumber";
import {
  LAST_BOOK_ID_KEY,
  LAST_LOAN_COUNT_KEY,
} from "@/utils/querystring/SearchAfter";
import { Clock, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { XButton } from "../atoms/button/icon/XButton";
import { useSearchTerm } from "@/contexts/SearchTermContext";
import { SEARCH_TERM_KEY } from "@/utils/querystring/SearchTerm";
import {
  SEARCH_HISTORY_MAX_LENGTH,
  useSearchHistory,
} from "@/contexts/SearchHistoryContext";

interface SearchProps {
  initSearchTerm: string | null;
}

const SEARCH_HISTORY: string[] = [
  "해리포터와 마법사의 돌",
  "1984 조지 오웰",
  "코스모스 칼 세이건",
  "사피엔스",
  "데미안 헤르만 헤세",
];

export const SearchBar = ({ initSearchTerm }: SearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { searchTerm, setSearchTerm, clearSearchTerm } = useSearchTerm();
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // ref 추가
  const containerRef = useRef<HTMLDivElement>(null);
  const { history, addHistory, removeHistory } = useSearchHistory();

  useEffect(() => {
    setSearchTerm(initSearchTerm === null ? "" : initSearchTerm);
    setShowHistory(false);
  }, [initSearchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
      inputRef.current?.blur();
      addHistory(searchTerm);
      setShowHistory(false);
      const params = new URLSearchParams(searchParams as any);
      params.set("searchTerm", searchTerm);
      params.delete(PAGE_QUERY_STRING_KEY);
      params.delete(LAST_LOAN_COUNT_KEY);
      params.delete(LAST_BOOK_ID_KEY);
      router.push(`/books?${params.toString()}`);
    });
  }

  const handleClear = () => {
    clearSearchTerm();
    // inputRef.current?.focus();
    const params = new URLSearchParams(searchParams as any);
    params.delete(SEARCH_TERM_KEY);
    router.push(`/books?${params.toString()}`);
  };

  const handleHistoryClick = (historyItem: string) => {
    search(historyItem);
  };

  const handleRemoveHistory = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    removeHistory(history[index]);
  };

  // input 따로 뺄 것
  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
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
          onFocus={(e) => setShowHistory(true)}
          autoComplete="off"
        />

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-3">
          {searchTerm && <XButton onClick={handleClear} />}

          <button type="submit">
            <Search className="text-muted-foreground" size={24} />
          </button>
        </div>
      </form>
      {showHistory && history.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          <div className="py-2">
            {history
              .slice()
              .reverse()
              .map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleHistoryClick(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleHistoryClick(item);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="w-full px-4 py-3 hover:bg-accent transition-colors flex items-center gap-3 group cursor-pointer"
                >
                  <Clock
                    size={18}
                    className="text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0"
                  />
                  <span className="text-foreground truncate text-base md:text-lg flex-1">
                    {item}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeHistory(item);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all p-1 flex-shrink-0"
                    aria-label="Delete history item"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
