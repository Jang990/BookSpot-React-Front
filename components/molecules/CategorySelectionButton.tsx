import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CATEGORY_MAP } from "@/types/BookCategory";
import { CATEGORY_QUERY_STRING_KEY } from "@/utils/querystring/CategoryId";

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

  if (category !== undefined) {
    return (
      <Link href={`/?${deleteCategoryParams.toString() ?? ""}`}>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 animate-in fade-in-0 slide-in-from-left-2"
        >
          <span>- {category.name}</span>
          <X className="ml-1 h-3 w-3 transition-transform hover:rotate-90" />
        </Button>
      </Link>
    );
  }

  return (
    <Link href={`/books/categories?${bookQueryString}`}>
      <Button
        variant="ghost"
        size="sm"
        className="text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 hover:scale-105"
      >
        <Plus className="mr-1 h-3 w-3 transition-transform hover:rotate-90" />책
        분류 검색
      </Button>
    </Link>
  );
};
