"use client";
import { MIN_SEARCH_TERM_LENGTH } from "@/app/page";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface SearchProps {
  initialSearchTerm?: string;
}

export const BookSearchBar = ({ initialSearchTerm }: SearchProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isPending, startTransition] = useTransition();

  // 검색 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 2자 미만 검색 불가 알림 필요
    if (!searchTerm || searchTerm.length < MIN_SEARCH_TERM_LENGTH) return;

    startTransition(() => {
      const params = new URLSearchParams();
      params.set("searchTerm", searchTerm);
      router.push(`/?${params.toString()}`);
    });
  };

  // input 따로 뺄 것
  return (
    <form onSubmit={handleSubmit} className="relative mb-6">
      <input
        name="search"
        type="text"
        placeholder="책 제목, 저자, 출판년도, 카테고리 또는 출판사를 입력하세요"
        className={`w-full p-4 pr-12 text-lg border-4 rounded-full focus:outline-none transition-all duration-300 ${
          isPending
            ? "border-primary animate-border-loading"
            : "border-input focus:border-primary"
        }`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
