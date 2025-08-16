"use client";

import { SkeletonDiv } from "@/components/atoms/SkeletonDiv";
import { DefaultFilterButton } from "@/components/molecules/button/filter/DefaultFilterButton copy";
import { SelectedFilterButton } from "@/components/molecules/button/filter/SelectedFilterButton";
import { CATEGORY_MAP } from "@/types/BookCategory";
import { fetchSingleLibrary } from "@/utils/api/LibraryApi";
import {
  CATEGORY_LEVEL_QUERY_STRING_KEY,
  CATEGORY_QUERY_STRING_KEY,
} from "@/utils/querystring/CategoryId";
import { LIBRARY_QUERY_STRING_KEY } from "@/utils/querystring/LibraryId";
import { deletePaginationOptions } from "@/utils/querystring/PaginationOptions.Util";
import { ListFilter, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface FilterStatusGroupProps {
  libraryId: number | null;
  categoryId: number | null;
  bookQueryString?: string;
  totalElements: number;
}
export const FilterStatusGroup = ({
  libraryId,
  categoryId,
  bookQueryString,
  totalElements,
}: FilterStatusGroupProps) => {
  const [libraryName, setLibraryName] = useState<string | null>(null);
  const [libLoading, setLibLoading] = useState(false);
  const [libError, setLibError] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    if (libraryId === null) {
      setLibraryName(null);
      setLibLoading(false);
      setLibError(false);
      return;
    }

    setLibLoading(true);
    setLibError(false);

    fetchSingleLibrary({ libraryId: libraryId.toString() })
      .then((lib) => {
        if (!mounted) return;
        setLibraryName(lib.name ?? null);
      })
      .finally(() => {
        if (!mounted) return;
        setLibLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [libraryId]);

  // href builders (동일 로직, 클라이언트에서 동작하도록 보수)
  const deleteLibraryHref = () => {
    const params = new URLSearchParams(bookQueryString ?? "");
    params.delete(LIBRARY_QUERY_STRING_KEY);
    deletePaginationOptions(params);
    return `/?${params.toString()}`;
  };

  const deleteCategoryParams = () => {
    const params = new URLSearchParams(bookQueryString ?? "");
    params.delete(CATEGORY_QUERY_STRING_KEY);
    params.delete(CATEGORY_LEVEL_QUERY_STRING_KEY);
    deletePaginationOptions(params);
    return params.toString();
  };

  const category = useMemo(() => {
    if (categoryId == null) return undefined;
    return CATEGORY_MAP.get(categoryId);
  }, [categoryId]);

  return (
    <div className="grid grid-cols-[1fr_auto] gap-4 items-end w-full my-3">
      <div className="flex flex-wrap justify-start gap-2">
        {/* Library button */}
        {libraryId === null ? (
          <DefaultFilterButton
            text="도서관 선택"
            href={`libraries/map/select?${bookQueryString}`}
          />
        ) : libLoading ? (
          <SelectedFilterButton
            text="불러오기..."
            href={`libraries/map/select?${bookQueryString}`}
            SelectedIcon={MapPin}
          />
        ) : libError ? (
          // 에러면 제거된 상태로 되돌리는 href 제공 (fallback)
          <SelectedFilterButton
            text="도서관 정보 오류"
            href={deleteLibraryHref()}
            SelectedIcon={MapPin}
          />
        ) : (
          <SelectedFilterButton
            text={libraryName ?? "도서관"}
            href={deleteLibraryHref()}
            SelectedIcon={MapPin}
          />
        )}

        {/* Category button */}
        {category === undefined ? (
          <DefaultFilterButton
            text="분류 선택"
            href={`/books/categories?${deleteCategoryParams()}`}
          />
        ) : (
          <SelectedFilterButton
            text={`${String(category.id).padStart(3, "0")}.${category.name}`}
            href={`/?${deleteCategoryParams()}`}
            SelectedIcon={ListFilter}
          />
        )}
      </div>

      <div className="self-end justify-self-end pb-2 pe-2">
        <span className="text-muted-foreground">
          {totalElements >= 10_000
            ? `10,000건 이상`
            : `${totalElements.toLocaleString()} 건`}
        </span>
      </div>
    </div>
  );
};
