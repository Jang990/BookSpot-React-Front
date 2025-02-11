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

  const addToCart = (bookid: string) => {
    const isSaved: boolean = addBookId(bookid);
    if (isSaved) setCart((prevCart) => [...prevCart, bookid]);
    return isSaved;
  };

  const removeFromCart = (bookId: string) => {
    const isRemoved: boolean = removeBookId(bookId);
    if (isRemoved)
      setCart((prevCart) => prevCart.filter((book) => book !== bookId));
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
