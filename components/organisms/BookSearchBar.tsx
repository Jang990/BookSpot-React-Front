import { SearchBar } from "../molecules/SearchBar";

interface SearchProps {
  initialSearchTerm: string;
}

export const BookSearchBar = ({ initialSearchTerm }: SearchProps) => {
  return (
    <div>
      <SearchBar initialSearchTerm={initialSearchTerm} />
    </div>
  );
};
