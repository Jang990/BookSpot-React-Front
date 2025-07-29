"use client";

import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { BookCategory } from "@/types/BookCategory";

interface CategoryCardProps {
  category: BookCategory;
  hasChildren: boolean;
  onExploreClick: (categoryId: number) => void;
  queryString: (categoryId: number) => string;
  isNavigating?: boolean;
  navigatingTo?: number | null;
}

export function CategoryCard({
  category,
  hasChildren,
  onExploreClick,
  queryString,
  isNavigating = false,
  navigatingTo,
}: CategoryCardProps) {
  const isCurrentlyNavigating = isNavigating && navigatingTo === category.id;

  return (
    <Card
      className={`hover:shadow-md transition-all duration-300 border-2 hover:border-primary/20 overflow-hidden ${
        isCurrentlyNavigating ? "scale-105 shadow-lg border-primary/40" : ""
      }`}
    >
      <CardContent className="p-0 h-full">
        <div className="flex h-full">
          {/* 메인 영역 - 카테고리로 이동 */}
          <div
            className="flex-1 p-4 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => {
              window.location.href = `/?${queryString(category.id)}`;
            }}
          >
            <div className="space-y-2">
              <div>
                <span className="inline-block bg-primary text-white rounded-full px-2 text-xs">
                  {category.id.toString().padStart(3, "0")}
                </span>
                <h3 className="pt-1 font-medium text-sm leading-tight">
                  {category.name}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">해당 분류로 검색</p>
            </div>
          </div>

          {/* 하위 탐색 영역 - 하위 카테고리가 있을 때만 표시 */}
          {hasChildren && (
            <div
              className={`w-12 flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-all duration-300 border-l ${
                isCurrentlyNavigating ? "bg-primary/20" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onExploreClick(category.id);
              }}
              title="하위 카테고리 탐색"
            >
              <ChevronRight
                className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                  isCurrentlyNavigating ? "translate-x-1" : ""
                }`}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
