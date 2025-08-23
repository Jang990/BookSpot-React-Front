import { SearchBar } from "@/components/molecules/SearchBar";
import { FilterStatusGroup } from "./FilterStatusGroup";

interface SearchProps {
  initSearchTerm: string | null;
  libraryId: number | null;
  categoryId: number | null;
  bookQueryString?: string;
}

export const BookSearchBar = async ({
  initSearchTerm,
  libraryId,
  categoryId,
  bookQueryString,
}: SearchProps) => {
  return (
    <div className="w-full">
      <SearchBar initSearchTerm={initSearchTerm} />
      <FilterStatusGroup
        categoryId={categoryId}
        libraryId={libraryId}
        bookQueryString={bookQueryString}
      />
    </div>
  );
};
