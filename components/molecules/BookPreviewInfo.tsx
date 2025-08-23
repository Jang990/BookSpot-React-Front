"use client";
import { BookPreview } from "@/types/BookPreview";
import {
  CardFooterLabel,
  CardSubLabel,
  CardTitleLabel,
} from "../atoms/label/CardLabel";
import { formatCount } from "@/utils/NumberFormatter";
import { BookCategory } from "@/types/BookCategory";

interface BookPreviewInfoProps {
  book: BookPreview;
}

export const BookPreviewInfo = ({ book }: BookPreviewInfoProps) => {
  return (
    <div className="p-4 flex flex-col flex-grow">
      <CardTitleLabel text={book.title} />
      <p className="mb-1">
        <CardSubLabel text={book.author} />
      </p>
      <p>
        <CardFooterLabel text={`${book.publicationYear} · ${book.publisher}`} />
        <CategoryLinkButton category={book.category} />
      </p>
      <div className="mt-auto pt-2">
        <CardFooterLabel
          text={`📖 ${formatCount(book.loanCount, "회 대출")}`}
        />
      </div>
    </div>
  );
};

interface CategoryLinkButtonProps {
  category: BookCategory;
}

const CategoryLinkButton = ({ category }: CategoryLinkButtonProps) => {
  function categoryIdText(categoryId: string | number): string {
    return categoryId.toString().padStart(3, "0");
  }

  const isUnknownCategory =
    category == null || category.id == null || category.name == null;

  return (
    <CardFooterLabel
      text={
        isUnknownCategory
          ? "알 수 없음"
          : `${categoryIdText(category.id)} · ${category.name}`
      }
    />
  );
};
