"use client";
import { useState, useTransition } from "react";
import { BookCategory, CATEGORY_ARRAY } from "@/types/BookCategory";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  CATEGORY_HISTORY_QUERY_STRING_KEY,
  CATEGORY_LEVEL_QUERY_STRING_KEY,
  CATEGORY_QUERY_STRING_KEY,
  getCategoryLevel,
  LEVEL_LEAF,
  parseCategoryHistory,
} from "@/utils/querystring/CategoryId";
import { CategorySearchBar } from "@/components/molecules/category/CategorySearchBar";
import { CategoryNavigation } from "@/components/molecules/category/CategoryNavigation";
import { CategoryEmptyState } from "@/components/molecules/category/CategoryEmptyState";
import { CategoryCard } from "../molecules/category/CategoryCard";

export const BookCategoryPageTemplate = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // URL에서 현재 경로 파싱
  const currentPath = parseCategoryHistory(searchParams);
  const [searchTerm, setSearchTerm] = useState("");
  const [navigatingTo, setNavigatingTo] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

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

    startTransition(() => {
      router.push(newUrl);
    });

    // 네비게이션 완료 후 상태 초기화
    setTimeout(() => {
      setNavigatingTo(null);
    }, 75);
  };

  // 1) level 결정: 100단위→1, 10단위→2, 개별→3
  const getCurrentLevel = (): number => {
    // if (currentPath.length === 0) return 0;
    // const parent = currentPath[currentPath.length - 1];
    // if (parent % 100 === 0) return 1;
    // if (parent % 10 === 0) return 2;
    // return 3;
    return currentPath.length;
  };

  const getCurrentCategoryId = (): number | null => {
    return currentPath.length === 0
      ? null
      : currentPath[currentPath.length - 1];
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
      // 000,100,200...
      return CATEGORY_ARRAY.filter((cat) => cat.id % 100 === 0);
    }
    const parent = currentPath[currentPath.length - 1];

    if (level === 1) {
      // 100을 눌렀으면 같은 100단위(100~900 중) + 자신의 부모(100) 포함
      const base = parent / 100;
      return CATEGORY_ARRAY.filter(
        (cat) => Math.floor(cat.id / 100) === base && cat.id % 10 === 0
      );
    }

    if (level === 2) {
      // 120을 눌렀으면 120~129 모두
      const baseTen = Math.floor(parent / 10);
      return CATEGORY_ARRAY.filter(
        (cat) => Math.floor(cat.id / 10) === baseTen
      );
    }

    return [];
  };

  // 하위 카테고리 존재 여부 확인
  const hasChildren = (id: number): boolean => {
    if (searchTerm) return false;
    if (getCurrentLevel() === 2 && id === getCurrentCategoryId()) return false;
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
      return CATEGORY_ARRAY.some((cat) => Math.floor(cat.id / 10) === baseTen);
    }
    // 3) 일 단위
    return false;
  };

  // 카테고리 선택 핸들러
  const handleCategorySelect = (categoryId: number) => {
    if (hasChildren(categoryId)) {
      // 네비게이션 시작 표시
      setNavigatingTo(categoryId);

      // 약간의 지연 후 실제 네비게이션 실행
      setTimeout(() => {
        const newPath = [...currentPath, categoryId];
        updatePath(newPath);
      }, 75);
    } else {
      // 최종 선택 - 카테고리 검색으로 이동
      window.location.href = `/?${queryString(categoryId)}`;
    }
  };

  const getCurrentCategoryLevel = (): string => {
    if (searchTerm) return LEVEL_LEAF;
    return getCategoryLevel(currentPath.length);
  };

  const queryString = (categoryId: number): string => {
    const params = new URLSearchParams(searchParams as any);
    params.set(CATEGORY_QUERY_STRING_KEY, String(categoryId));
    params.set(CATEGORY_LEVEL_QUERY_STRING_KEY, getCurrentCategoryLevel());
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
  const isNavigating = isPending || navigatingTo !== null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="px-6 space-y-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleCategories
              .sort((a, b) => a.id - b.id)
              .map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  hasChildren={hasChildren(category.id)}
                  onExploreClick={handleCategorySelect}
                  queryString={queryString}
                  isNavigating={isNavigating}
                  navigatingTo={navigatingTo}
                  subText="하위 카테고리 탐색"
                />
              ))}
          </div>
        ) : (
          <CategoryEmptyState searchTerm={searchTerm} />
        )}
      </div>
    </div>
  );
};
