"use client";

import type React from "react";
import {
  findBookIds,
  addBookId,
  removeBookId,
} from "@/utils/BookCartLocalStorage";
import { createContext, useContext, useState, useEffect } from "react";

type BookCartContextType = {
  cart: string[];
  findAllBookIds: () => string[];
  addToCart: (bookId: string) => boolean;
  removeFromCart: (bookId: string) => boolean;
};

const BookCartContext = createContext<BookCartContextType | undefined>(
  undefined
);

export const useBookCart = () => {
  const context = useContext(BookCartContext);
  if (!context) {
    throw new Error("useBookCart must be used within a BookCartProvider");
  }
  return context;
};

type BookCartProviderProps = { children: React.ReactNode };
export const BookCartProvider = ({ children }: BookCartProviderProps) => {
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    const bookCart = findAllBookIds();
    if (bookCart.length > 0) setCart(bookCart);
  }, []);

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
    <BookCartContext.Provider
      value={{ cart, findAllBookIds, addToCart, removeFromCart }}
    >
      {children}
    </BookCartContext.Provider>
  );
};
