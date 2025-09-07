"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import {
  findBookIds,
  addBookId,
  removeBookId,
  clear,
} from "@/utils/BagLocalStorage";

type BagContextType = {
  bag: string[];
  clearBag: () => Promise<void>;
  addToBag: (bookId: string) => Promise<boolean>;
  removeFromBag: (bookId: string) => Promise<boolean>;
};

const BagContext = createContext<BagContextType | undefined>(undefined);

export const useBag = () => {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error("useBag must be used within a BagProvider");
  }
  return context;
};

type BookCartProviderProps = { children: React.ReactNode };

export const BagProvider = ({ children }: BookCartProviderProps) => {
  const [bag, setBag] = useState<string[]>([]);

  useEffect(() => {
    const initializeBag = async () => {
      const bookCart = await findBookIds();
      if (bookCart.length > 0) {
        setBag(bookCart);
      }
    };

    initializeBag();
  }, []);

  const clearBag = async () => {
    await clear();
    setBag([]);
  };

  const addToBag = async (targetId: string) => {
    try {
      const isSaved = await addBookId(targetId);
      if (isSaved) {
        setBag((prevCart) => [...prevCart, targetId]);
      }
      return isSaved;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const removeFromBag = async (targetId: string) => {
    const isRemoved = await removeBookId(targetId);
    if (isRemoved) {
      setBag((prevCart) =>
        prevCart.filter((selectedId) => selectedId !== targetId)
      );
    }
    return isRemoved;
  };

  return (
    <BagContext.Provider
      value={{
        bag,
        clearBag,
        addToBag,
        removeFromBag,
      }}
    >
      {children}
    </BagContext.Provider>
  );
};
