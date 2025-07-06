import { BookPreview } from "@/types/BookPreview";
import { EmptySearchResult } from "../molecules/EmptySearchResult";
import { SearchableBookInfo } from "../organisms/book/preview/SearchableBookInfo";

interface BookPreviewListProps {
  searchResults: BookPreview[];
}

export const BookPreviewList = ({ searchResults }: BookPreviewListProps) => {
  return (
    <div>
      {searchResults.length === 0 && <EmptySearchResult />}

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {searchResults.length !== 0 && (
          <>
            {searchResults.map((book) => (
              <SearchableBookInfo
                key={book.id}
                book={book}
              ></SearchableBookInfo>
            ))}
          </>
        )}
      </div>

      {/* <div className="flex justify-center items-center mt-8">
        {isLoading && <Loading />}
      </div> */}
    </div>
  );
};
