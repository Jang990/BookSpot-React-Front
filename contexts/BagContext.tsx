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
  cart: string[];
  clearCart: () => void;
  findAllBookIds: () => string[];
  addToCart: (bookId: string) => boolean;
  removeFromCart: (bookId: string) => boolean;
};

const BagContext = createContext<BagContextType | undefined>(undefined);

export const useBookCart = () => {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error("useBookCart must be used within a BookCartProvider");
  }
  return context;
};

type BookCartProviderProps = { children: React.ReactNode };
export const BagProvider = ({ children }: BookCartProviderProps) => {
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    const bookCart = findAllBookIds();
    if (bookCart.length > 0) setCart(bookCart);
  }, []);

  const clearCart = () => {
    setCart([]);
    clear();
  };

  const findAllBookIds = () => {
    return findBookIds();
  };

  const addToCart = (targetId: string) => {
    const isSaved: boolean = addBookId(targetId);
    if (isSaved) setCart((prevCart) => [...prevCart, targetId]);
    return isSaved;
  };

  const removeFromCart = (targetId: string) => {
    const isRemoved: boolean = removeBookId(targetId);
    if (isRemoved)
      setCart((prevCart) =>
        prevCart.filter((selectedId) => selectedId !== targetId)
      );
    return isRemoved;
  };

  return (
    <BagContext.Provider
      value={{ cart, clearCart, findAllBookIds, addToCart, removeFromCart }}
    >
      {children}
    </BagContext.Provider>
  );
};
