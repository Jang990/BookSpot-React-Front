"use client";

import type { BookCategory } from "@/types/BookCategory";
import { CategoryCard } from "./CategoryCard";

interface CategoryGridProps {
  categories: BookCategory[];
  onExploreClick: (categoryId: number) => void;
  queryString: (categoryId: number) => string;
  hasChildren: (id: number) => boolean;
  isNavigating?: boolean;
  navigatingTo: number | null;
}

export function CategoryGrid({
  categories,
  onExploreClick,
  queryString,
  hasChildren,
  isNavigating = false,
  navigatingTo,
}: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          hasChildren={hasChildren(category.id)}
          onExploreClick={onExploreClick}
          queryString={queryString}
          isNavigating={isNavigating}
          navigatingTo={navigatingTo}
        />
      ))}
    </div>
  );
}
