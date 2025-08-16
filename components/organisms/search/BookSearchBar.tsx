import { SearchBar } from "@/components/molecules/SearchBar";
import { FilterStatusGroup } from "./FilterStatusGroup";

interface SearchProps {
  libraryId: number | null;
  categoryId: number | null;
  bookQueryString?: string;
  initialSearchTerm: string;
  totalElements: number;
}

export const BookSearchBar = async ({
  libraryId,
  categoryId,
  bookQueryString,
  initialSearchTerm,
  totalElements,
}: SearchProps) => {
  return (
    <div className="w-full">
      <SearchBar initialSearchTerm={initialSearchTerm} />
      <FilterStatusGroup
        categoryId={categoryId}
        libraryId={libraryId}
        totalElements={totalElements}
        bookQueryString={bookQueryString}
      />
    </div>
  );
};
