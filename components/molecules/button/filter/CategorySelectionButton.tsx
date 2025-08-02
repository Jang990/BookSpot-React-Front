import { Plus, X } from "lucide-react";
import { CATEGORY_MAP } from "@/types/BookCategory";
import { CATEGORY_QUERY_STRING_KEY } from "@/utils/querystring/CategoryId";
import { PAGE_QUERY_STRING_KEY } from "@/utils/querystring/PageNumber";
import { BookSearchFilterButton } from "./BookSearchFilterButton";

interface CategorySelectionButtonProps {
  bookQueryString?: string;
  categoryId: number | null;
}

export const CategorySelectionButton = async ({
  bookQueryString,
  categoryId,
}: CategorySelectionButtonProps) => {
  let category = undefined;
  if (categoryId !== null) category = CATEGORY_MAP.get(categoryId);
  const deleteCategoryParams = new URLSearchParams(bookQueryString as any);
  deleteCategoryParams.delete(CATEGORY_QUERY_STRING_KEY);
  deleteCategoryParams.delete(PAGE_QUERY_STRING_KEY);

  if (category !== undefined) {
    return (
      <BookSearchFilterButton
        href={`/?${deleteCategoryParams.toString() ?? ""}`}
        buttonClassName="text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 animate-in fade-in-0 slide-in-from-left-2"
        Icon={X}
        text={`${String(category.id).padStart(3, "0")}.${category.name}`}
      />
    );
  }

  return (
    <BookSearchFilterButton
      href={`/books/categories?${deleteCategoryParams}`}
      buttonClassName="text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 animate-in fade-in-0 slide-in-from-left-2"
      Icon={Plus}
      text="분류 검색"
    />
  );
};
