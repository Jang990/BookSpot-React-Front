import { Loader } from "lucide-react";
import BookInfo from "@/components/organisms/BookInfo";
import { EmptySearchResult } from "@/components/molecules/EmptySearchResult";
import { BookPreview } from "@/types/BookPreview";
import { forwardRef } from "react";

interface SimpleSearchResultProps {
  searchResults: BookPreview[];
  isLoading: boolean;
}

export const BookSimpleSearchResult = forwardRef<
  HTMLDivElement,
  SimpleSearchResultProps
>(({ searchResults, isLoading }: SimpleSearchResultProps, ref) => {
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
                ref={index === searchResults.length - 1 ? ref : null}
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
});
