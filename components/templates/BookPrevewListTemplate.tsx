import { BookPreview } from "@/types/BookPreview";
import { EmptySearchResult } from "../molecules/EmptySearchResult";
import { Loader } from "lucide-react";
import { BookInfo } from "../organisms/BookInfo";
import { useEffect, useRef } from "react";

interface BookPreviewListProps {
  searchResults: BookPreview[];
  isLoading: boolean;
  hasMore: boolean;
  isCartPage: boolean;
  addPage?: () => void;
}

export const BookPreviewList = ({
  searchResults,
  isLoading,
  hasMore,
  addPage,
  isCartPage,
}: BookPreviewListProps) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!addPage || isLoading) return;

    // 이전 observer가 있으면 해제
    if (observer.current) observer.current.disconnect();

    // 새로운 IntersectionObserver 생성
    observer.current = new IntersectionObserver((entries) => {
      // 마지막 요소가 화면에 보이면
      if (entries[0].isIntersecting && hasMore) {
        addPage(); // 페이지 증가시켜서 다음 데이터 로드
      }
    });

    // 마지막 책 요소가 있으면 observer가 그 요소를 감시하도록 설정
    if (lastBookElementRef.current)
      observer.current.observe(lastBookElementRef.current);

    // 컴포넌트 언마운트 시 observer 해제
    return () => {
      if (observer.current) observer.current.disconnect(); // observer 연결 해제
    };
  }, [isLoading]);

  return (
    <div>
      {!isLoading && searchResults.length === 0 && <EmptySearchResult />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.length !== 0 && (
          <>{searchResults.map((book, index) => createBookInfo(book, index))}</>
        )}
      </div>

      <div className="flex justify-center items-center mt-8">
        {isLoading && (
          <Loader className="animate-spin text-primary" size={32} />
        )}
      </div>
    </div>
  );

  function createBookInfo(book: BookPreview, index: number) {
    return (
      <BookInfo
        key={book.id}
        book={book}
        isCartPage={isCartPage}
        ref={index === searchResults.length - 1 ? lastBookElementRef : null}
      />
    );
  }
};
