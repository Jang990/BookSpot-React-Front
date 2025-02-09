"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { Book } from "@/types/Book";

type BookCartContextType = {
  cart: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
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

export const BookCartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Book[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("bookCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book: Book) => {
    setCart((prevCart) => {
      if (!prevCart.some((item) => item.id === book.id)) {
        return [...prevCart, book];
      }
      return prevCart;
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart((prevCart) => prevCart.filter((book) => book.id !== bookId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <BookCartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </BookCartContext.Provider>
  );
};
