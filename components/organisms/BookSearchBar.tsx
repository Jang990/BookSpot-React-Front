import { CategorySelectionButton } from "../molecules/CategorySelectionButton";
import { LibrarySelectionButton } from "../molecules/LibrarySelectionButton";
import { SearchBar } from "../molecules/SearchBar";

interface SearchProps {
  libraryId: number | null;
  categoryId: number | null;
  bookQueryString?: string;
  initialSearchTerm: string;
}

export const BookSearchBar = ({
  libraryId,
  categoryId,
  bookQueryString,
  initialSearchTerm,
}: SearchProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap items-center justify-between">
          <LibrarySelectionButton
            libraryId={libraryId}
            bookQueryString={bookQueryString}
          />
          <CategorySelectionButton
            categoryId={categoryId}
            bookQueryString={bookQueryString}
          />
        </div>
        <div className="flex-1">{/* 빈 공간 */}</div>
      </div>

      <SearchBar initialSearchTerm={initialSearchTerm} />
    </div>
  );
};
