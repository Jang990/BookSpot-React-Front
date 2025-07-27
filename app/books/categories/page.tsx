"use client";
import { useState } from "react";
import { ChevronRight, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCategory, CATEGORY_ARRAY } from "@/types/BookCategory";
import { useSearchParams } from "next/navigation";
import { CATEGORY_QUERY_STRING_KEY } from "@/utils/querystring/CategoryId";

export default function CategorySelector() {
  const searchParams = useSearchParams();
  const queryString = (categoryId: number): string => {
    const params = new URLSearchParams(searchParams as any);
    params.set(CATEGORY_QUERY_STRING_KEY, String(categoryId));
    return params.toString();
  };

  const [currentPath, setCurrentPath] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 1) level 결정: 100단위→1, 10단위→2, 개별→3
  const getCurrentLevel = (): number => {
    if (currentPath.length === 0) return 0;
    const parent = currentPath[currentPath.length - 1]; // number
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
      // 최상위: 0,100,200,...,900
      return CATEGORY_ARRAY.filter((cat) => cat.id % 100 === 0);
    }

    const parent = currentPath[currentPath.length - 1]; // 안전하게 number

    if (level === 1) {
      // 100단위 선택 시: 110~190 (10단위)
      const base = parent / 100;
      return CATEGORY_ARRAY.filter(
        (cat) =>
          Math.floor(cat.id / 100) === base &&
          cat.id % 10 === 0 &&
          cat.id !== parent
      );
    }

    if (level === 2) {
      // 10단위 선택 시: e.g. 120→121~129
      const base = Math.floor(parent / 10);
      return CATEGORY_ARRAY.filter(
        (cat) => Math.floor(cat.id / 10) === base && cat.id % 10 !== 0
      );
    }

    return [];
  };

  // 카테고리 선택 핸들러
  const handleCategorySelect = (categoryId: number) => {
    const hasChildren = CATEGORY_ARRAY.some((cat) => {
      if (categoryId < 10) {
        return cat.id >= 10 && cat.id < 100;
      } else if (categoryId < 100) {
        const baseHundred = Math.floor(categoryId / 100) * 100;
        return (
          cat.id > baseHundred &&
          cat.id < baseHundred + 100 &&
          cat.id % 10 === 0
        );
      } else {
        const baseTen = Math.floor(categoryId / 10) * 10;
        return cat.id > baseTen && cat.id < baseTen + 10;
      }
    });

    if (hasChildren) {
      setCurrentPath([...currentPath, categoryId]);
    } else {
      // 최종 선택 - 실제로는 books?categoryId=categoryId로 이동
      window.location.href = `/?${queryString(categoryId)}`;
    }
  };

  // 브레드크럼 클릭 핸들러
  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      setCurrentPath([]);
    } else {
      setCurrentPath(currentPath.slice(0, index + 1));
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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-5 h-5" />
            도서 분류 선택
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 검색 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="분류 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* 브레드크럼 */}
          {!searchTerm && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              {breadcrumbs.map((breadcrumb, index) => (
                <div key={breadcrumb.id} className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBreadcrumbClick(index - 1)}
                    className="h-auto p-1 text-sm hover:text-foreground"
                  >
                    {breadcrumb.name}
                  </Button>
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 카테고리 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleCategories.map((category) => {
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
                    (cat) =>
                      Math.floor(cat.id / 10) === baseTen && cat.id % 10 !== 0
                  );
                }

                // 3) 일 단위
                return false;
              };

              return (
                <Card
                  key={category.id}
                  className="hover:shadow-md transition-shadow border-2 hover:border-primary/20 overflow-hidden"
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
                          <p className="text-xs text-muted-foreground">
                            해당 분류로 검색
                          </p>
                        </div>
                      </div>

                      {/* 하위 탐색 영역 - 하위 카테고리가 있을 때만 표시 */}
                      {hasChildren(category.id) && (
                        <div
                          className="w-12 flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors border-l"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategorySelect(category.id);
                          }}
                          title="하위 카테고리 탐색"
                        >
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {visibleCategories.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? "검색 결과가 없습니다."
                : "하위 카테고리가 없습니다."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
