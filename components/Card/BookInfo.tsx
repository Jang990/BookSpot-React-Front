"use client";

import Image from "next/image";
import type { Book } from "@/types/Book";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface BookInfoProps {
  book: Book;
  onAddToCart: () => void;
  onRemoveFromCart?: () => void;
  isInCart?: boolean;
}

export default function BookInfo({
  book,
  onAddToCart,
  onRemoveFromCart,
  isInCart = false,
}: BookInfoProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col bg-card rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/book/${book.id}`}>
        <div className="relative h-64 bg-muted">
          <Image
            src={book.image || "/placeholder.svg"}
            alt={book.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Link>
      <div className="p-4 flex-grow">
        <h2 className="text-lg font-semibold mb-1 text-card-foreground">
          {book.title}
        </h2>
        <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
        <p className="text-xs text-muted-foreground">
          {book.year} · {book.publisher}
        </p>
      </div>
      <div
        className={`absolute bottom-2 right-2 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        {!isInCart && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="bg-primary text-primary-foreground p-1.5 rounded-full hover:bg-primary/80 transition-colors animate-in zoom-in-50 duration-200 active:scale-90"
          >
            <ShoppingCart size={20} />
          </button>
        )}
        {isInCart && onRemoveFromCart && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFromCart();
            }}
            className="bg-destructive text-destructive-foreground p-1.5 rounded-full hover:bg-destructive/80 transition-colors animate-in zoom-in-50 duration-200 active:scale-90"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
