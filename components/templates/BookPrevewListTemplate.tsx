"use client";
import { BookPreview } from "@/types/BookPreview";
import { EmptySearchResult } from "../molecules/EmptySearchResult";
import { SearchableBookInfo } from "../organisms/book/preview/SearchableBookInfo";
import { useBag } from "@/contexts/BagContext";
import { useToast } from "@/contexts/ToastContext";
import { useState } from "react";
import { ShelfSelectListDialog } from "../organisms/popup/ShelfSelectListDialog";

interface BookPreviewListProps {
  searchResults: BookPreview[];
}

export const BookPreviewList = ({ searchResults }: BookPreviewListProps) => {
  const { addToBag } = useBag();
  const { showToast } = useToast();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedBookId, setSelectedBookId] = useState<string>("");

  const openShelfListDialog = (bookId: string) => {
    setSelectedBookId(bookId);
    setIsOpen(true);
  };

  const closeShelfListDialog = () => {
    setSelectedBookId("");
    setIsOpen(false);
  };

  const handleAddToBag = (book: BookPreview) => {
    openShelfListDialog(book.id);
    /* addToBag(book.id)
      .then((isSuccess) => {
        if (isSuccess)
          showToast(`'${book.title}'이(가) 책가방에 추가되었습니다.`, "INFO");
        else showToast("알 수 없는 오류가 발생했습니다.", "WARN");
      })
      .catch((err) => {
        if (err instanceof Error) showToast(err.message, "WARN");
        else showToast("알 수 없는 오류가 발생했습니다.", "WARN");
      }); */
  };

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
                onClickAddBtn={handleAddToBag}
              ></SearchableBookInfo>
            ))}
          </>
        )}
      </div>
      <ShelfSelectListDialog
        isOpen={isOpen}
        bookId={selectedBookId}
        onClose={closeShelfListDialog}
        onComplete={() => {}}
        onClickNewShelf={() => {}}
        onBookshelfToggle={(shelfId) => {}}
      />
    </div>
  );
};
