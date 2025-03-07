import { Search } from "lucide-react";

interface SearchProps {
  // searchTerm: string;
  isLoading?: boolean;
  doSearch: (term: string) => void;
}

export const BookSearchBar = ({
  // searchTerm,
  isLoading,
  doSearch,
}: SearchProps) => {
  // 검색 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const inputValue = formData.get("search") as string;

    // 2자 미만 검색 불가 알림 필요
    if (inputValue.length < 2) return;
    doSearch(inputValue);
  };

  // input 따로 뺄 것
  return (
    <form onSubmit={handleSubmit} className="relative mb-6">
      <input
        name="search"
        type="text"
        placeholder="책 제목, 저자, 출판년도, 카테고리 또는 출판사를 입력하세요"
        className={`w-full p-4 pr-12 text-lg border-4 rounded-full focus:outline-none transition-all duration-300 ${
          isLoading
            ? "border-primary animate-border-loading"
            : "border-input focus:border-primary"
        }`}
      />
      <button
        type="submit"
        className="absolute right-4 top-1/2 transform -translate-y-1/2"
      >
        <Search className="text-muted-foreground" size={24} />
      </button>
    </form>
  );
};
