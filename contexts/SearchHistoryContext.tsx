"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import {
  getHistory,
  addHistory as addHistoryCookie,
  removeHistory as removeHistoryCookie,
  SEARCH_HISTORY_MAX_LENGTH,
} from "@/utils/SearchHistoryCookie";

type SearchHistoryContextType = {
  history: string[];
  addHistory: (term: string) => void;
  removeHistory: (term: string) => void;
};

const SearchHistoryContext = createContext<
  SearchHistoryContextType | undefined
>(undefined);

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

  useEffect(() => {
    const fetchHistory = async () => {
      const cookieHistory = await getHistory();
      setHistory(cookieHistory);
    };
    fetchHistory();
  }, []);

  const addHistory = async (term: string) => {
    term = term.trim();
    if (!term) return;

    setHistory((prev) => {
      const filtered = prev.filter((item) => item !== term);
      const updated = [...filtered, term];
      if (updated.length > SEARCH_HISTORY_MAX_LENGTH) updated.shift();
      return updated;
    });

    await addHistoryCookie(term);
  };

  const removeHistory = async (term: string) => {
    setHistory((prev) => prev.filter((item) => item !== term));
    await removeHistoryCookie(term);
  };

  return (
    <SearchHistoryContext.Provider
      value={{ history, addHistory, removeHistory }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
};
