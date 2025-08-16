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

interface FilterStatusGroupProps {
  libraryId: number | null;
  categoryId: number | null;
  bookQueryString?: string;
  totalElements: number;
}
export const FilterStatusGroup = async ({
  libraryId,
  categoryId,
  bookQueryString,
  totalElements,
}: FilterStatusGroupProps) => {
  async function libraryFilterButton(libraryId: number | null) {
    return libraryId === null ? (
      <DefaultFilterButton
        text="도서관 선택"
        href={`libraries/map/select?${bookQueryString}`}
      />
    ) : (
      <SelectedFilterButton
        text={
          (
            await fetchSingleLibrary({
              libraryId: libraryId.toString(),
            })
          ).name
        }
        href={deleteLibraryHref()}
        SelectedIcon={MapPin}
      />
    );

    function deleteLibraryHref(): string {
      const queryString = (): string => {
        const params = new URLSearchParams(bookQueryString);
        params.delete(LIBRARY_QUERY_STRING_KEY);
        deletePaginationOptions(params);
        return params.toString();
      };

      return `/?${queryString()}`;
    }
  }

  async function categoryFilterButton(categoryId: number | null) {
    let category = undefined;
    if (categoryId !== null) {
      category = CATEGORY_MAP.get(categoryId);
    }

    return category === undefined ? (
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
    );

    function deleteCategoryParams(): string {
      const deleteCategoryParams = new URLSearchParams(bookQueryString as any);
      deleteCategoryParams.delete(CATEGORY_QUERY_STRING_KEY);
      deleteCategoryParams.delete(CATEGORY_LEVEL_QUERY_STRING_KEY);
      deletePaginationOptions(deleteCategoryParams);
      return deleteCategoryParams.toString();
    }
  }

  return (
    <div className="grid grid-cols-[1fr_auto] gap-4 items-end w-full my-3">
      <div className="flex flex-wrap justify-start gap-2">
        {await libraryFilterButton(libraryId)}
        {categoryFilterButton(categoryId)}
      </div>

      <div className=" self-end justify-self-end pb-2 pe-2">
        <span className="text-muted-foreground">
          {totalElements >= 10_000
            ? `10,000건 이상`
            : `${totalElements.toLocaleString()} 건`}{" "}
        </span>
      </div>
    </div>
  );
};
