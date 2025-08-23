import { SearchBar } from "@/components/molecules/SearchBar";
import { FilterStatusGroup } from "./FilterStatusGroup";

interface SearchProps {
  libraryId: number | null;
  categoryId: number | null;
  bookQueryString?: string;
}

export const BookSearchBar = async ({
  libraryId,
  categoryId,
  bookQueryString,
}: SearchProps) => {
  return (
    <div className="w-full">
      <SearchBar />
      <FilterStatusGroup
        categoryId={categoryId}
        libraryId={libraryId}
        bookQueryString={bookQueryString}
      />
    </div>
  );
};
