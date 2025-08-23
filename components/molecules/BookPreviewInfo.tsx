"use client";
import { BookPreview } from "@/types/BookPreview";
import {
  CardFooterLabel,
  CardSubLabel,
  CardTitleLabel,
} from "../atoms/label/CardLabel";
import { formatCount } from "@/utils/NumberFormatter";
import { BookCategory } from "@/types/BookCategory";
import { onClickCategory } from "../templates/BookCategoryPageTemplate";
import { useRouter, useSearchParams } from "next/navigation";
import { LEVEL_LEAF } from "@/utils/querystring/CategoryId";

interface BookPreviewInfoProps {
  book: BookPreview;
}

export const BookPreviewInfo = ({ book }: BookPreviewInfoProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isUnknownCategory =
    book.category == null ||
    book.category.id == null ||
    book.category.name == null;

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
        <CategoryLinkButton
          text={
            isUnknownCategory
              ? "알 수 없음"
              : `${categoryIdText(book.category.id)} · ${book.category.name}`
          }
          onClick={() => {
            if (isUnknownCategory) return;
            onClickCategory(router, searchParams, book.category.id, LEVEL_LEAF);
          }}
        />
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
  text: string;
  onClick: () => void;
}

const CategoryLinkButton = ({ text, onClick }: CategoryLinkButtonProps) => {
  return (
    <button
      type="button"
      className="
        text-xs border-primary bg-primary/10 
        text-primary px-1 py-0.5
      "
      onClick={onClick}
    >
      <span className="font-medium">{text}</span>
    </button>
  );
};
