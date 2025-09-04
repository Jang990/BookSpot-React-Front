"use client";
import { BookPreview } from "@/types/BookPreview";
import {
  CardFooterLabel,
  CardSubLabel,
  CardTitleLabel,
} from "../atoms/label/CardLabel";
import { formatCount } from "@/utils/NumberFormatter";
import { onClickCategory } from "../templates/BookCategoryPageTemplate";
import { useRouter, useSearchParams } from "next/navigation";
import { LEVEL_LEAF } from "@/utils/querystring/CategoryId";
import { useSearchTerm } from "@/contexts/SearchTermContext";

interface BookPreviewInfoProps {
  book: BookPreview;
}

const DEAFULT_TITLE = "제목 없음";
const DEFAULT_TEXT = "정보 없음";
export const BookPreviewInfo = ({ book }: BookPreviewInfoProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearSearchTerm } = useSearchTerm();

  function categoryText(): string {
    if (book.category && book.category.id && book.category.name)
      return `${categoryIdText(book.category.id)} · ${book.category.name}`;
    else return DEFAULT_TEXT;
  }

  function categoryIdText(categoryId: string | number): string {
    return categoryId.toString().padStart(3, "0");
  }

  return (
    <div className="p-4 flex flex-col flex-grow">
      <CardTitleLabel text={book.title ?? DEAFULT_TITLE} />
      <p className="mb-1">
        <CardSubLabel text={book.author ?? DEFAULT_TEXT} />
      </p>
      <p>
        <CardFooterLabel
          text={`${book.publicationYear ?? DEFAULT_TEXT} · ${book.publisher ?? DEFAULT_TEXT}`}
        />
        <CategoryLinkButton
          text={categoryText()}
          onClick={() => {
            if (book.category && book.category.id && book.category.name)
              onClickCategory(
                router,
                searchParams,
                book.category.id,
                LEVEL_LEAF,
                clearSearchTerm
              );
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
