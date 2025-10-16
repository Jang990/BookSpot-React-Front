import { SearchBar } from "@/components/molecules/SearchBar";
import { FilterStatusGroup } from "./FilterStatusGroup";
import { SortBy } from "@/types/Pageable";

interface SearchProps {
  initSearchTerm: string | null;
  libraryId: number | null;
  categoryId: number | null;
  bookQueryString?: string;
  sortBy: SortBy;
}

export const BookSearchBar = async ({
  initSearchTerm,
  libraryId,
  categoryId,
  bookQueryString,
  sortBy,
}: SearchProps) => {
  return (
    <div className="w-full">
      <SearchBar initSearchTerm={initSearchTerm} />
      <FilterStatusGroup
        categoryId={categoryId}
        libraryId={libraryId}
        bookQueryString={bookQueryString}
        sortBy={sortBy}
      />
    </div>
  );
};
