"use client";
import { useState } from "react";
import { Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCategory, CATEGORY_ARRAY } from "@/types/BookCategory";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  CATEGORY_HISTORY_QUERY_STRING_KEY,
  CATEGORY_QUERY_STRING_KEY,
  parseCategoryHistory,
} from "@/utils/querystring/CategoryId";
import { CategorySearchBar } from "@/components/molecules/category/CategorySearchBar";
import { CategoryNavigation } from "@/components/molecules/category/CategoryNavigation";
import { CategoryGrid } from "@/components/molecules/category/CategoryGrid";
import { CategoryEmptyState } from "@/components/molecules/category/CategoryEmptyState";

export default function CategorySelector() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // URL에서 현재 경로 파싱
  const currentPath = parseCategoryHistory(searchParams);
  const [searchTerm, setSearchTerm] = useState("");

  // 경로 업데이트 (URL 변경)
  const updatePath = (newPath: number[]) => {
    const params = new URLSearchParams(searchParams as any);

    if (newPath.length === 0) {
      params.delete(CATEGORY_HISTORY_QUERY_STRING_KEY);
    } else {
      params.set(CATEGORY_HISTORY_QUERY_STRING_KEY, newPath.join(","));
    }

    // 검색어가 있으면 경로 변경 시 검색어 초기화
    if (searchTerm) {
      setSearchTerm("");
    }

    const newUrl = params.toString() ? `?${params.toString()}` : `${pathname}`;
    router.push(newUrl);
  };

  // 1) level 결정: 100단위→1, 10단위→2, 개별→3
  const getCurrentLevel = (): number => {
    if (currentPath.length === 0) return 0;
    const parent = currentPath[currentPath.length - 1];
    if (parent % 100 === 0) return 1;
    if (parent % 10 === 0) return 2;
    return 3;
  };

  // 2) 보여줄 카테고리 필터링
  const getVisibleCategories = (): BookCategory[] => {
    const level = getCurrentLevel();

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return CATEGORY_ARRAY.filter(
        (cat) =>
          cat.name.toLowerCase().includes(term) ||
          cat.id.toString().includes(term)
      );
    }

    if (level === 0) {
      return CATEGORY_ARRAY.filter((cat) => cat.id % 100 === 0);
    }

    const parent = currentPath[currentPath.length - 1];

    if (level === 1) {
      const base = parent / 100;
      return CATEGORY_ARRAY.filter(
        (cat) =>
          Math.floor(cat.id / 100) === base &&
          cat.id % 10 === 0 &&
          cat.id !== parent
      );
    }

    if (level === 2) {
      const base = Math.floor(parent / 10);
      return CATEGORY_ARRAY.filter(
        (cat) => Math.floor(cat.id / 10) === base && cat.id % 10 !== 0
      );
    }

    return [];
  };

  // 하위 카테고리 존재 여부 확인
  const hasChildren = (id: number): boolean => {
    // 1) 백 단위
    if (id % 100 === 0) {
      const baseHundred = id / 100;
      return CATEGORY_ARRAY.some(
        (cat) =>
          cat.id !== id &&
          Math.floor(cat.id / 100) === baseHundred &&
          cat.id % 10 === 0
      );
    }
    // 2) 십 단위
    if (id % 10 === 0) {
      const baseTen = Math.floor(id / 10);
      return CATEGORY_ARRAY.some(
        (cat) => Math.floor(cat.id / 10) === baseTen && cat.id % 10 !== 0
      );
    }
    // 3) 일 단위
    return false;
  };

  // 카테고리 선택 핸들러
  const handleCategorySelect = (categoryId: number) => {
    if (hasChildren(categoryId)) {
      const newPath = [...currentPath, categoryId];
      updatePath(newPath);
    } else {
      // 최종 선택 - 카테고리 검색으로 이동
      window.location.href = `/?${queryString(categoryId)}`;
    }
  };

  const queryString = (categoryId: number): string => {
    const params = new URLSearchParams();
    params.set(CATEGORY_QUERY_STRING_KEY, String(categoryId));
    params.delete(CATEGORY_HISTORY_QUERY_STRING_KEY);
    return params.toString();
  };

  // 브레드크럼 클릭 핸들러
  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      updatePath([]);
    } else {
      const newPath = currentPath.slice(0, index + 1);
      updatePath(newPath);
    }
  };

  // 브레드크럼 생성
  const getBreadcrumbs = () => {
    const breadcrumbs = [{ id: -1, name: "전체 분류" }];
    currentPath.forEach((categoryId) => {
      const category = CATEGORY_ARRAY.find((cat) => cat.id === categoryId);
      if (category) {
        breadcrumbs.push(category);
      }
    });
    return breadcrumbs;
  };

  const visibleCategories = getVisibleCategories();
  const breadcrumbs = getBreadcrumbs();
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-5 h-5" />
            도서 분류 선택
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 검색 */}
          <CategorySearchBar value={searchTerm} onChange={setSearchTerm} />

          {/* 브레드크럼 */}
          {!searchTerm && (
            <CategoryNavigation
              breadcrumbs={breadcrumbs}
              onBreadcrumbClick={handleBreadcrumbClick}
            />
          )}

          {/* 카테고리 그리드 */}
          {visibleCategories.length > 0 ? (
            <CategoryGrid
              categories={visibleCategories}
              onExploreClick={handleCategorySelect}
              queryString={queryString}
              hasChildren={hasChildren}
            />
          ) : (
            <CategoryEmptyState searchTerm={searchTerm} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
