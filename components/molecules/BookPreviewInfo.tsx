"use client";
import { BookPreview } from "@/types/BookPreview";
import {
  CardFooterLabel,
  CardSubLabel,
  CardTitleLabel,
} from "../atoms/label/CardLabel";
import { formatCount } from "@/utils/NumberFormatter";

interface BookPreviewInfoProps {
  book: BookPreview;
}

export const BookPreviewInfo = ({ book }: BookPreviewInfoProps) => {
  function categoryIdText(categoryId: string | number): string {
    return categoryId.toString().padStart(3, "0");
  }

  return (
    <div className="p-4 flex flex-col flex-grow">
      <CardTitleLabel text={book.title} />
      <p className="mb-1">
        <CardSubLabel text={book.author} />
      </p>
      <p>
        <CardFooterLabel text={`${book.publicationYear} · ${book.publisher}`} />
        <CardFooterLabel
          text={
            book.category == null ||
            book.category.id == null ||
            book.category.name == null
              ? "알 수 없음"
              : `${categoryIdText(book.category.id)} · ${book.category.name}`
          }
        />
      </p>
      <div className="mt-auto pt-2">
        <CardFooterLabel text={`📖 ${formatCount(book.loanCount, "회")}`} />
      </div>
    </div>
  );
};
