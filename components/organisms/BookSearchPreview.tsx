import { Loader } from "lucide-react";
import BookInfo from "../Card/BookInfo";
import { EmptySearchResult } from "../molecules/EmptySearchResult";
import { BookPreview } from "@/types/BookPreview";

interface SimpleSearchResultProps {
  searchResults: BookPreview[];
  isLoading: boolean;
  lastBookElementRef: (node: HTMLDivElement | null) => void;
}

export const BookSimpleSearchResult = ({
  searchResults,
  isLoading,
  lastBookElementRef,
}: SimpleSearchResultProps) => {
  return (
    <>
      {searchResults.length === 0 ? (
        <EmptySearchResult />
      ) : (
        <>
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
          {isLoading && (
            <div className="flex justify-center items-center mt-8">
              <Loader className="animate-spin text-primary" size={32} />
            </div>
          )}
        </>
      )}
    </>
  );
};
