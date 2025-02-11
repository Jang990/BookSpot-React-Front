import { Search } from "lucide-react";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const BookSearchBar = ({ searchTerm, setSearchTerm }: SearchProps) => {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="책 제목, 저자, 출판년도, 카테고리 또는 출판사를 입력하세요"
        className="w-full p-4 pr-12 text-lg border-2 border-input rounded-full focus:outline-none focus:border-primary"
      />
      <Search
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        size={24}
      />
    </div>
  );
};
