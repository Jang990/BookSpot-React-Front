import { LibrarySelectionButton } from "../molecules/LibrarySelectionButton";
import { SearchBar } from "../molecules/SearchBar";

interface SearchProps {
  libraryId?: string;
  initialSearchTerm: string;
}

export const BookSearchBar = ({
  libraryId,
  initialSearchTerm,
}: SearchProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <LibrarySelectionButton libraryId="서울 도서관" />
        </div>
        <div className="flex-1">{/* 빈 공간 */}</div>
      </div>

      <SearchBar initialSearchTerm={initialSearchTerm} />
    </div>
  );
};
