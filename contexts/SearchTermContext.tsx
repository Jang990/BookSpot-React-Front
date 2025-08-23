"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type SearchTermContextType = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearchTerm: () => void;
};

const SearchTermContext = createContext<SearchTermContextType | undefined>(
  undefined
);

export const useSearchTerm = () => {
  const context = useContext(SearchTermContext);
  if (!context) {
    throw new Error("useBookCart must be used within a BookCartProvider");
  }
  return context;
};

type SearchTermProviderProps = { children: React.ReactNode };
export const SearchTermProvider = ({ children }: SearchTermProviderProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const clearSearchTerm = () => setSearchTerm("");

  return (
    <SearchTermContext.Provider
      value={{ searchTerm, setSearchTerm, clearSearchTerm }}
    >
      {children}
    </SearchTermContext.Provider>
  );
};
