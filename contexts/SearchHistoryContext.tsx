"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

type SearchHistoryContextType = {
  history: string[];
  addHistory: (term: string) => void;
  removeHistory: (term: string) => void;
};

const SearchHistoryContext = createContext<
  SearchHistoryContextType | undefined
>(undefined);

export const SEARCH_HISTORY_MAX_LENGTH = 5;

export const useSearchHistory = () => {
  const context = useContext(SearchHistoryContext);
  if (!context)
    throw new Error(
      "useSearchHistory must be used within a SearchHistoryProvider"
    );
  return context;
};

type SearchHistoryProviderProps = { children: React.ReactNode };

export const SearchHistoryProvider = ({
  children,
}: SearchHistoryProviderProps) => {
  const [history, setHistory] = useState<string[]>([]);

  const addHistory = (term: string) => {
    if (!term.trim()) return;

    setHistory((prev) => {
      const filtered = prev.filter((item) => item !== term);
      const updated = [...filtered, term];
      if (updated.length > SEARCH_HISTORY_MAX_LENGTH) updated.shift(); // 5개 초과 시 FIFO 제거
      return updated;
    });
  };

  const removeHistory = (term: string) => {
    setHistory((prev) => prev.filter((item) => item !== term));
  };

  return (
    <SearchHistoryContext.Provider
      value={{ history, addHistory, removeHistory }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
};
