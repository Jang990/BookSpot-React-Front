import { BookPreview } from "@/types/BookPreview";
import { EmptySearchResult } from "../molecules/EmptySearchResult";
import { Loader } from "lucide-react";
import { BookInfo } from "../organisms/BookInfo";

interface BookPreviewListProps {
  searchResults: BookPreview[];
  isLoading: boolean;
  isCartPage: boolean;
}

export const BookPreviewList = ({
  searchResults,
  isLoading,
  isCartPage,
}: BookPreviewListProps) => {
  return (
    <div>
      {!isLoading && searchResults.length === 0 && <EmptySearchResult />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.length !== 0 && (
          <>{searchResults.map((book) => createBookInfo(book))}</>
        )}
      </div>

      <div className="flex justify-center items-center mt-8">
        {isLoading && (
          <Loader className="animate-spin text-primary" size={32} />
        )}
      </div>
    </div>
  );

  function createBookInfo(book: BookPreview) {
    return <BookInfo key={book.id} book={book} isCartPage={isCartPage} />;
  }
};
