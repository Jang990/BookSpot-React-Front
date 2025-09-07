"use client";

import type React from "react";
import {
  findBookIds,
  addBookId,
  removeBookId,
  clear,
} from "@/utils/BagLocalStorage";
import { createContext, useContext, useState, useEffect } from "react";

type BagContextType = {
  bag: string[];
  clearBag: () => void;
  findAllBookIds: () => string[];
  addToBag: (bookId: string) => boolean;
  removeFromBag: (bookId: string) => boolean;
};

const BagContext = createContext<BagContextType | undefined>(undefined);

export const useBag = () => {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error("useBookCart must be used within a BookCartProvider");
  }
  return context;
};

type BookCartProviderProps = { children: React.ReactNode };
export const BagProvider = ({ children }: BookCartProviderProps) => {
  const [bag, setBag] = useState<string[]>([]);

  useEffect(() => {
    const bookCart = findAllBookIds();
    if (bookCart.length > 0) setBag(bookCart);
  }, []);

  const clearBag = () => {
    setBag([]);
    clear();
  };

  const findAllBookIds = () => {
    return findBookIds();
  };

  const addToBag = (targetId: string) => {
    const isSaved: boolean = addBookId(targetId);
    if (isSaved) setBag((prevCart) => [...prevCart, targetId]);
    return isSaved;
  };

  const removeFromBag = (targetId: string) => {
    const isRemoved: boolean = removeBookId(targetId);
    if (isRemoved)
      setBag((prevCart) =>
        prevCart.filter((selectedId) => selectedId !== targetId)
      );
    return isRemoved;
  };

  return (
    <BagContext.Provider
      value={{
        bag: bag,
        clearBag,
        findAllBookIds,
        addToBag,
        removeFromBag,
      }}
    >
      {children}
    </BagContext.Provider>
  );
};
