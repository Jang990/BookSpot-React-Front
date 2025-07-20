"use client";
import { BookPreview } from "@/types/BookPreview";
import {
  CardFooterLabel,
  CardSubLabel,
  CardTitleLabel,
} from "../atoms/label/CardLabel";

interface BookPreviewInfoProps {
  book: BookPreview;
}

export const BookPreviewInfo = ({ book }: BookPreviewInfoProps) => {
  function categoryIdText(categoryId: string | number): string {
    return categoryId.toString().padStart(3, "0");
  }

  return (
    <div className="p-4 flex-grow">
      <CardTitleLabel text={book.title} />
      <p className="mb-1">
        <CardSubLabel text={book.author} />
      </p>
      <p>
        <CardFooterLabel text={`${book.publicationYear} · ${book.publisher}`} />
        <CardFooterLabel
          text={`${categoryIdText(book.category.id)} · ${book.category.name}`}
        />
      </p>
    </div>
  );
};
