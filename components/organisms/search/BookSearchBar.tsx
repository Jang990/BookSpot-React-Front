import { SearchBar } from "@/components/molecules/SearchBar";
import { FilterStatusGroup } from "./FilterStatusGroup";
import { SortBy } from "@/types/Pageable";
import { YearRange } from "@/utils/api/BookPreviewApi";
import { DEFAULT_YEAR_RANGE } from "@/utils/querystring/YearRange";

interface SearchProps {
  initSearchTerm: string | null;
  libraryId: number | null;
  categoryId: number | null;
  bookQueryString?: string;
  sortBy: SortBy;
  yearRange?: YearRange;
}

export const BookSearchBar = async ({
  initSearchTerm,
  libraryId,
  categoryId,
  bookQueryString,
  sortBy,
  yearRange = DEFAULT_YEAR_RANGE,
}: SearchProps) => {
  return (
    <div className="w-full">
      <SearchBar initSearchTerm={initSearchTerm} />
      <FilterStatusGroup
        categoryId={categoryId}
        libraryId={libraryId}
        bookQueryString={bookQueryString}
        sortBy={sortBy}
        yearRange={yearRange}
      />
    </div>
  );
};
