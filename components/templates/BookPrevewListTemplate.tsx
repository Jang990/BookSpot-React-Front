"use client";
import { BookPreview } from "@/types/BookPreview";
import { EmptySearchResult } from "../molecules/EmptySearchResult";
import { BookInfo } from "@/components/organisms/book/preview/BookInfo";
import { Loading } from "@/components/atoms/animation/Loading";
import { CartButton } from "../atoms/button/icon/CartButton";
import { useBookCart } from "@/contexts/BookCartContext";
import { SearchableBookInfo } from "../organisms/book/preview/SearchableBookInfo";

interface BookPreviewListProps {
  searchResults: BookPreview[];
}

export const BookPreviewList = ({ searchResults }: BookPreviewListProps) => {
  const { addToCart } = useBookCart();

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

  function createBookInfo(book: BookPreview) {
    return (
      <BookInfo
        key={book.id}
        book={book}
        actionButtons={[<CartButton onClick={() => addToCart(book.id)} />]}
      />
    );
  }
};
