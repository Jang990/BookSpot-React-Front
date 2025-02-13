"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { AddToCartButton } from "../atoms/button/AddToCartButton";
import { RemoveFromCartButton } from "../atoms/button/RemoveFromCartButton";
import { BookPreview } from "@/types/BookPreview";
import {
  CardFooterLabel,
  CardSubLabel,
  CardTitleLabel,
} from "../atoms/label/CardLabel";

interface BookInfoProps {
  book: BookPreview;
  isInCart?: boolean;
}

export default function BookInfo({ book, isInCart = false }: BookInfoProps) {
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
        <CardTitleLabel text={book.title} />
        <p className="mb-2">
          <CardSubLabel text={book.author} />
        </p>
        <p>
          <CardFooterLabel text={book.publicationYear} />
          <CardFooterLabel text=" · " />
          <CardFooterLabel text={book.publisher} />
        </p>
      </div>
      <div
        className={`absolute bottom-2 right-2 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        {!isInCart && <AddToCartButton bookId={book.id} />}
        {isInCart && <RemoveFromCartButton bookId={book.id} />}
      </div>
    </div>
  );
}
