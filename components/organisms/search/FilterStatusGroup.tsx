"use client";

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
import { useEffect, useMemo, useRef, useState } from "react";

interface FilterStatusGroupProps {
  libraryId: number | null;
  categoryId: number | null;
  bookQueryString?: string;
}

export function useDragToScroll(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let pointerId: number | null = null;

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return !!target.closest(
        'a, button, input, textarea, select, label, [role="button"]'
      );
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return; // 왼쪽 버튼만
      if (isInteractive(e.target)) return; // 링크/버튼 클릭 방해 금지

      isDown = true;
      pointerId = e.pointerId;
      el.setPointerCapture?.(pointerId);
      startX = e.clientX;
      startScroll = el.scrollLeft;

      // UX: grab 상태, 텍스트 선택 방지
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
      el.style.touchAction = "pan-y"; // 세로 스크롤은 허용
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      el.scrollLeft = startScroll - dx;
    };

    const endDrag = (e: PointerEvent) => {
      if (!isDown) return;
      isDown = false;
      if (pointerId !== null) el.releasePointerCapture?.(pointerId);
      pointerId = null;
      el.style.cursor = "grab";
      el.style.userSelect = "";
      // touchAction는 남겨둬도 무해
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("pointerleave", endDrag);

    // 초기 커서
    el.style.cursor = "grab";

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("pointerleave", endDrag);
      el.style.cursor = "";
      el.style.userSelect = "";
      el.style.touchAction = "";
    };
  }, [ref]);
}

export const FilterStatusGroup = ({
  libraryId,
  categoryId,
  bookQueryString,
}: FilterStatusGroupProps) => {
  const [libraryName, setLibraryName] = useState<string | null>(null);
  const [libLoading, setLibLoading] = useState(false);
  const [libError, setLibError] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  useDragToScroll(containerRef);

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
    <div className="flex items-end justify-between w-full my-1 mb-2 select-text">
      <div
        ref={containerRef}
        className="flex items-center gap-1 flex-nowrap whitespace-nowrap overflow-x-auto scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
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
    </div>
  );
};
