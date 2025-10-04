"use client";
import { BookPreview } from "@/types/BookPreview";
import { EmptySearchResult } from "../molecules/EmptySearchResult";
import { SearchableBookInfo } from "../organisms/book/preview/SearchableBookInfo";
import { useState } from "react";
import { ShelfSelectListDialog } from "../organisms/popup/ShelfSelectListDialog";

interface BookPreviewListProps {
  searchResults: BookPreview[];
}

export const BookPreviewList = ({ searchResults }: BookPreviewListProps) => {
  const [shelfDialogType, setShelfDialogType] = useState<"select" | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<string>("");

  const openShelfListDialog = (bookId: string) => {
    setSelectedBookId(bookId);
    setShelfDialogType("select");
  };

  const closeShelfListDialog = () => {
    setSelectedBookId("");
    setShelfDialogType(null);
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
                onClickAddBtn={(book) => openShelfListDialog(book.id)}
              ></SearchableBookInfo>
            ))}
          </>
        )}
      </div>
      <ShelfSelectListDialog
        isOpen={shelfDialogType === "select"}
        bookId={selectedBookId}
        onClose={closeShelfListDialog}
        onComplete={() => {}}
        onClickNewShelf={() => {}}
      />
    </div>
  );
};
