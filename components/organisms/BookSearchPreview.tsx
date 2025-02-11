import { Book } from "@/types/Book";
import { Search } from "lucide-react";
import BookInfo from "../Card/BookInfo";

interface SimpleSearchResultProps {
  searchResults: Book[];
  lastBookElementRef: (node: HTMLDivElement | null) => void;
}

export const BookSimpleSearchResult = ({
  searchResults,
  lastBookElementRef,
}: SimpleSearchResultProps) => {
  return (
    <>
      {searchResults.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-12">
          <Search size={64} className="text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((book, index) => (
            <div
              key={book.id}
              ref={
                index === searchResults.length - 1 ? lastBookElementRef : null
              } // 무한 스크롤용
            >
              <BookInfo book={book} isInCart={false} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
