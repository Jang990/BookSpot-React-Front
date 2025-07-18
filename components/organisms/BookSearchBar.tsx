import { LibrarySelectionButton } from "../molecules/LibrarySelectionButton";
import { SearchBar } from "../molecules/SearchBar";

interface SearchProps {
  libraryId?: string;
  bookQueryString?: string;
  initialSearchTerm: string;
}

export const BookSearchBar = ({
  libraryId,
  bookQueryString,
  initialSearchTerm,
}: SearchProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <LibrarySelectionButton
            libraryId={libraryId}
            bookQueryString={bookQueryString}
          />
        </div>
        <div className="flex-1">{/* 빈 공간 */}</div>
      </div>

      <SearchBar initialSearchTerm={initialSearchTerm} />
    </div>
  );
};
