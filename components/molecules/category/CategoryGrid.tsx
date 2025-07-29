"use client";

import type { BookCategory } from "@/types/BookCategory";
import { CategoryCard } from "./CategoryCard";

interface CategoryGridProps {
  categories: BookCategory[];
  onCategoryClick: (categoryId: number) => void;
  onExploreClick: (categoryId: number) => void;
  queryString: (categoryId: number) => string;
  hasChildren: (id: number) => boolean;
}

export function CategoryGrid({
  categories,
  onCategoryClick,
  onExploreClick,
  queryString,
  hasChildren,
}: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          hasChildren={hasChildren(category.id)}
          onCategoryClick={onCategoryClick}
          onExploreClick={onExploreClick}
          queryString={queryString}
        />
      ))}
    </div>
  );
}
